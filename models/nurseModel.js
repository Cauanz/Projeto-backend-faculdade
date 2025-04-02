const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Nurse = sequelize.define('Nurse', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password_hash: { type: DataTypes.TEXT, allowNull: false },
  sector: { type: DataTypes.STRING },
  coren: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Nurse;
