const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Doctor = sequelize.define('doctor', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.TEXT, allowNull: false },
  crm: { type: DataTypes.STRING, allowNull: false, unique: true },
  speciality: { type: DataTypes.STRING },
  phone_number: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Doctor;

//TODO - TALVEZ TROCAR TIPOS PARA BATER TUDO EM PORTUGUES OU COM O PATIENT