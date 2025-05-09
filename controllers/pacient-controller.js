const bcrypt = require("bcrypt");
const Patient = require("../models/patientModel");
const { removeAccents, formatCPF, formatPhone } = require("../functions");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const patientRegister = async (req, res) => { 

  const { name, email, birthDate, address, CPF, phoneNumber, password } = req.body;

  try {

    if (!name || !email || !birthDate || !address || !CPF || !phoneNumber || !password) {
      return res.status(400).json({ error: "Email, nome, data de nascimento, endereço, CPF, número de telefone e senha são obrigatórios." });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const existingUser = await Patient.findOne({ where: {
        [Op.or]: [
          { email: email },
          { cpf: formatCPF(CPF) }
        ] 
      } 
    });

    if (existingUser) {
      res.status(400).json({ message: "Email ou CPF já cadastrado" });
      return;
    }

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
    res.status(500).json({ message: 'Erro ao tentar criar paciente', error });
  }
}

const patientLogin = async (req, res) => {

  const { CPF, password } = req.body;

  try {

    if (!CPF || !password) {
      return res.status(400).json({ error: "CPF e senha são obrigatórios." });
    }
    
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

const getPatientById = async (req, res) => {

  const id = req.params.id;

  try {

    const patient = await Patient.findOne({ where: { id } });

    if (!patient) {
      return res.status(404).json({ message: 'Paciente não encontrado' });
    }

    res.json({ patient });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar o paciente', error });
  }

}

const updatePatient = async (req, res) => {

  const { id } = req.params;
  const { name, email, birthDate, address, CPF, phoneNumber, medical_history } = req.body;

  try {

    if (!name && !email && !birthDate && !address && !CPF && !phoneNumber && !medical_history) {
      return res.status(400).json({ error: "Pelo menos um campo deve ser enviado para atualização." });
    }
    
    const existingUser = await Patient.findOne({ where: { id }});

    if(!existingUser) {
      res.status(401).json({ message: "Paciente não encontrado"});
      return;
    }

    if (email) {
      const emailExists = await Patient.findOne({ where: { email, id: { [Op.ne]: id } } });
      if (emailExists) {
        return res.status(400).json({ error: "Email já está em uso por outro paciente." });
      }
    }
    
    if (CPF) {
      const cpfExists = await Patient.findOne({ where: { cpf: formatCPF(CPF), id: { [Op.ne]: id } } });
      if (cpfExists) {
        return res.status(400).json({ error: "CPF já está em uso por outro paciente." });
      }
    }

    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = removeAccents(name);
    if (email) fieldsToUpdate.email = email;
    if (birthDate) fieldsToUpdate.birth_date = birthDate;
    if (address) fieldsToUpdate.address = removeAccents(address);
    if (CPF) fieldsToUpdate.cpf = formatCPF(CPF);
    if (phoneNumber) fieldsToUpdate.telefone = formatPhone(phoneNumber);
    if (medical_history) fieldsToUpdate.medical_history = medical_history;

    const updatedPatient = await Patient.update(fieldsToUpdate, { where: { id } });

    res.status(200).json({ message: "Paciente atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o paciente", error });
  }
}

const deletePatient = async (req, res) => {

  const { id } = req.params;

  try {
    
    const existingUser = await Patient.findOne({ where: { id }});

    if(!existingUser) {
      res.status(401).json({ message: "Paciente não encontrado"});
      return;
    }

    const deletedPatient = await Patient.destroy({ where: { id } });

    res.status(200).json({ message: "Paciente deletado com sucesso" });

  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar paciente", error });
  }

}
module.exports = { patientRegister, patientLogin, getPatients, getPatientById, updatePatient, deletePatient };