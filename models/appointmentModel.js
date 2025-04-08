const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Appointment = sequelize.define('appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patient_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'patient', key: 'id' } },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'doctor', key: 'id' } },
  appointment_date: { type: DataTypes.DATE, allowNull: false },
  // appointment_type: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false }
}, { timestamps: false });

module.exports = Appointment;
