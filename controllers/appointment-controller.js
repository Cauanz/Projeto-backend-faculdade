const bcrypt = require("bcrypt");
const { removeAccents, formatPhone, formatCRM } = require("../functions");
const Appointment = require("../models/appointmentModel");

const appointmentRegister = async (req, res) => {

  const { patientId, doctorId, appointmentDate, status } = req.body;

  try {

    if (!patientId || !doctorId || !appointmentDate || !status) {
      return res.status(400).json({ error: "Ids do paciente e médico, data da consulta e status são obrigatórios." });
    }

    const existingAppointment = await Appointment.findOne({ where: { doctor_id: doctorId, appointment_date: appointmentDate } });

    if (existingAppointment) {
      res.status(400).json({ message: "Consulta já criada" });
      return;
    } 

    const newAppointment = await Appointment.create({ 
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      status,
    });

    res.status(201).json({ message: "Consulta agendada com sucesso", appointment: newAppointment});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao tentar agendar consulta', error });
  }
}

const getAppointments = async (req, res) => {
  
  try {
    
    const appointments = await Appointment.findAll();

    res.json({ appointments });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar as consultas', error });
  }

}

const getAppointment = async (req, res) => {

  const id = req.params.id;

  try {

    const appointment = await Appointment.findOne({ where: { id } });

    res.json({ appointment });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar a consulta', error });
  }

}

const getPacientAppointments = async (req, res) => {

  const { patientId } = req.params;

  try {

    const patientAppointments = await Appointment.findOne({ where: { patient_id: patientId } });

    if (!patientAppointments || patientAppointments.length === 0) {
      return res.status(404).json({ message: "Nenhuma consulta encontrada para o paciente especificado." });
    }

    res.json({ patientAppointments });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar a consulta do paciente especificado', error });
  }

}

const updateAppointment = async (req, res) => {

  const { id } = req.params;
  const { patientId, doctorId, appointmentDate, status } = req.body;

  try {

    if (!patientId && !doctorId && !appointmentDate && !status) {
      return res.status(400).json({ error: "Pelo menos um campo deve ser enviado para atualização." });
    }
    
    const existingAppointment = await Appointment.findOne({ where: { id }});

    if(!existingAppointment) {
      res.status(401).json({ message: "Consulta não encontrada"});
      return;
    }
    
    const fieldsToUpdate = {};

    if (patientId) fieldsToUpdate.patient_id = patientId;
    if (doctorId) fieldsToUpdate.doctor_id = doctorId;
    if (appointmentDate) fieldsToUpdate.appointment_date = appointmentDate;
    if (status) fieldsToUpdate.status = status;

    const updatedAppointment = await Appointment.update(fieldsToUpdate, { where: { id } });

    res.status(200).json({ message: "Consulta atualizada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar consulta", error });
  }

}       

const deleteAppointment = async (req, res) => {

  const { id } = req.params;

  try {
    
    const existingAppointment = await Appointment.findOne({ where: { id }});

    if(!existingAppointment) {
      res.status(401).json({ message: "Consulta não encontrado"});
      return;
    }

    const deletedAppointment = await Appointment.destroy({ where: { id } });

    res.status(200).json({ message: "Consulta deletada com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar consulta", error });
  }

}

module.exports = { appointmentRegister, getAppointments, getAppointment, getPacientAppointments, updateAppointment, deleteAppointment };