const bcrypt = require("bcrypt");
const { removeAccents, formatPhone } = require("../functions");
const jwt = require("jsonwebtoken");
const Admin = require("../models/adminModel");

//! - NADA TESTADO NEM CHECADO

const adminRegister = async (req, res) => {

  const { name, email, sector, phoneNumber, password } = req.body;

  try {

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const existingUser = await Admin.findOne({ where: { email } });

    if (existingUser) {
      res.status(400).json({ message: "Email já cadastrado" });
      return;
    }
    
    const newAdmin = await Admin.create({ 
      name: removeAccents(name), 
      email, 
      password: passwordHash, 
      sector,
      telefone: formatPhone(phoneNumber)
    });

    res.status(201).json({ message: "Administrador cadastrado com sucesso", user: newAdmin});
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao tentar criar administrador', error });
  }
}

const adminLogin = async (req, res) => {

  const { email, password } = req.body;

  try {
    
    const existingUser = await Admin.findOne({ where: { email }});

    if(!existingUser) {
      res.status(401).json({ message: "Administrador não encontrado"});
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
    return res.status(500).json({ message: 'Erro ao fazer login do administrador', error });
  }

}

const getAdmins = async (req, res) => {
  
  try {
    
    const admins = await Admin.findAll();

    res.json({ admins });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar os administradores', error });
  }

}

const getAdmin = async (req, res) => {

  const id = req.params.id;

  try {

    const admin = await Admin.findOne({ where: { id } });

    res.json({ admin });

  } catch (error) {
    return res.status(500).json({ message: 'Não foi possivel recuperar o administrador', error });
  }

}

const updateAdmin = async (req, res) => {

  const { id } = req.params;
  const { name, email, sector, phoneNumber } = req.body;

  try {
    
    const existingUser = await Admin.findOne({ where: { id }});

    if(!existingUser) {
      res.status(401).json({ message: "Administrador não encontrado"});
      return;
    }
    
    const fieldsToUpdate = {};

    if (name) fieldsToUpdate.name = removeAccents(name);
    if (email) fieldsToUpdate.email = email;
    if (sector) fieldsToUpdate.sector = sector;
    if (phoneNumber) fieldsToUpdate.phone_number = formatPhone(phoneNumber);

    const updatedAdmin = await Admin.update(fieldsToUpdate, { where: { id } });

    res.status(200).json({ message: "Administrador atualizado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar o administrador", error });
  }

}

const deleteAdmin = async (req, res) => {

  const { id } = req.params;

  try {
    
    const existingUser = await Admin.findOne({ where: { id }});

    if(!existingUser) {
      res.status(401).json({ message: "Administrador não encontrado"});
      return;
    }

    const deletedAdmin = await Admin.destroy({ where: { id } });

    res.status(200).json({ message: "Administrador deletado com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar Administrador", error });
  }

}

module.exports = { adminRegister, adminLogin, getAdmin, getAdmins, updateAdmin, deleteAdmin };