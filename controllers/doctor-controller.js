const bcrypt = require("bcrypt");
const { removeAccents, formatPhone, formatCRM } = require("../functions");
const jwt = require("jsonwebtoken");
const Doctor = require("../models/doctorModel");

const doctorRegister = async (req, res) => {

  const { name, email, speciality, crm, phoneNumber, password } = req.body;

  try {

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

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

const doctorLogin = async (req, res) => {

  const { crm, password } = req.body;

  try {
    
    const existingUser = await Doctor.findOne({ where: { crm: formatCRM(crm) }});

    if(!existingUser) {
      res.status(401).json({ message: "Médico(a) não encontrado(a)"});
      return;
    }

    const correctPassword = await bcrypt.compare(password, existingUser.password);

    if(!correctPassword) {
      res.status(500).json({ message: "Senha incorreta" });
      return;
    }

    const token = jwt.sign({ time: Date.now() }, process.env.JWT_SECRET);
    res.json({token});

  } catch (error) {
    return res.status(500).json({ message: 'Erro ao fazer login do médico(a)', error });
  }

}

const getDoctors = async (req, res) => {
  
  try {
    
    const doctors = await Doctor.findAll();

    res.json({ doctors });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar os médicos', error });
  }

}

const getDoctor = async (req, res) => {

  const id = req.params.id;

  try {

    const doctor = await Doctor.findOne({ where: { id } });

    res.json({ doctor });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar o(a) médico(a)', error });
  }

}

const updateDoctor = async (req, res) => {

  const { id } = req.params;
  const { name, email, speciality, crm, phoneNumber } = req.body;

  try {
    
    const existingUser = await Doctor.findOne({ where: { id }});

    if(!existingUser) {
      res.status(401).json({ message: "Médico(a) não encontrado(a)"});
      return;
    }
    
    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = removeAccents(name);
    if (email) fieldsToUpdate.email = email;
    if (speciality) fieldsToUpdate.speciality = speciality;
    if (crm) fieldsToUpdate.crm = formatCRM(crm);
    if (phoneNumber) fieldsToUpdate.phone_number = formatPhone(phoneNumber);

    const updatedDoctor = await Doctor.update(fieldsToUpdate, { where: { id } });

    res.status(200).json({ message: "Médico(a) atualizado(a) com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o(a) médico(a)", error });
  }

}

const deleteDoctor = async (req, res) => {

  const { id } = req.params;

  try {
    
    const existingUser = await Doctor.findOne({ where: { id }});

    if(!existingUser) {
      res.status(401).json({ message: "Médico(a) não encontrado"});
      return;
    }

    const deletedDoctor = await Doctor.destroy({ where: { id } });

    res.status(200).json({ message: "Médico(a) deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar médico(a)", error });
  }

}

module.exports = { doctorRegister, doctorLogin, getDoctors, getDoctor, updateDoctor, deleteDoctor };