const bcrypt = require("bcrypt");
const Patient = require("../models/PatientModel");
const { removeAccents, formatCPF, formatPhone } = require("../functions");
const jwt = require("jsonwebtoken");
const { json } = require("sequelize");

const patientRegister = async (req, res) => {

  const { name, email, birthDate, address, CPF, phoneNumber, password } = req.body;

  try {

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const existingUser = await Patient.findOne({ where: { email } });

    if (existingUser) res.status(400).json({ message: "Email já cadastrado" });

    const newPatient = await Patient.create({ 
      name: removeAccents(name), 
      email, 
      password: passwordHash, 
      birth_date: birthDate, 
      address: removeAccents(address), 
      cpf: formatCPF(CPF), 
      telefone: formatPhone(phoneNumber), 
      medical_history: [] 
    });

    res.status(201).json({ message: "Paciente cadastrado com sucesso", user: newPatient});
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao tentar criar paciente', error });
  }
}

const patientLogin = async (req, res) => {

  const { CPF, password } = req.body;

  try {
    
    const existingUser = await Patient.findOne({ where: { cpf: formatCPF(CPF) }});

    if(!existingUser) {
      res.status(401).json({ message: "Paciente não encontrado"});
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
    return res.status(500).json({ message: 'Erro ao fazer login do paciente', error });
  }

}

const getPatients = async (req, res) => {
  
  try {
    
    const patients = await Patient.findAll();

    res.json({ patients });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar os pacientes', error });
  }

}

const getPatient = async (req, res) => {

  const id = req.params.id;

  try {

    const patient = await Patient.findOne({ where: { id } });

    res.json({ patient });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar o paciente', error });
  }

}


module.exports = { patientRegister, patientLogin, getPatients, getPatient };