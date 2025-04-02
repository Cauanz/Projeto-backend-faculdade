const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Appointment = sequelize.define('Appointment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  patient_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Patients', key: 'id' } },
  doctor_id: { type: DataTypes.INTEGER, allowNull: false, references: { model: 'Doctors', key: 'id' } },
  appointment_date: { type: DataTypes.DATE, allowNull: false },
  appointment_type: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.ENUM('scheduled', 'completed', 'canceled'), allowNull: false }
}, { timestamps: false });

module.exports = Appointment;
