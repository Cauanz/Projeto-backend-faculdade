const bcrypt = require("bcrypt");
const { removeAccents, formatPhone, formatCRM } = require("../functions");
const jwt = require("jsonwebtoken");

const appointmentRegister = async (req, res) => {

  const { pacientId, doctorId, appointmentDate, status } = req.body;

  try {


    //TODO - TERMINAR ESSA ROTA DE CRIAR CONSULTA E AS DEMAIS QUE FALTAM

    if (!pacientId || !doctorId || !appointmentDate || !status) {
      return res.status(400).json({ error: "Ids do paciente e médico, data da consulta e status são obrigatórios." });
    }

    const existingUser = await Doctor.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: "Email já cadastrado" }) 
      return;
    } 

    const newDoctor = await Doctor.create({ 
      name: removeAccents(name), 
      email, 
      password: passwordHash, 
      crm: formatCRM(crm), 
      speciality,
      phone_number: formatPhone(phoneNumber)
    });

    res.status(201).json({ message: "Médico(a) cadastrado(a) com sucesso", user: newDoctor});
  } catch (error) {
    res.status(500).json({ message: 'Erro ao tentar criar médico', error });
  }
}