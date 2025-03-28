const bcrypt = require("bcrypt");
const Patient = require("../models/PatientModel");

const patientRegister = async (req, res) => {

  const {name, email, birthDate, address, CPF, phoneNumber, password } = req.body;

  try {

    const salt = bcrypt.genSalt(10);
    const passwordHash = bcrypt.hash(password, salt);

    const existingUser = await Patient.findOne({ where: { email } });

    if (existingUser) res.status(400).json({ message: "Email já cadastrado" });

    const newPatient = await Patient.create({ name, email, password_hash: passwordHash, birth_date: birthDate, CPF: CPF, address, phone_number: phoneNumber, medical_history: [] });

    res.status(201).json({ message: "Paciente cadastrado com sucesso", user: newPatient});
  } catch (error) {
    return res.status(500).json({ message: 'Erro ao tentar criar paciente', error });
  }
}





module.exports = { patientRegister };