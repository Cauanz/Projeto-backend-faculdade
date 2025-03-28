const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Patient = sequelize.define("Patient", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    birth_date: { type: DataTypes.DATE },
    CPF: { type: DataTypes.STRING, allowNull: false},
    address: { type: DataTypes.STRING, allowNull: false},
    phone_number: { type: DataTypes.STRING, allowNull: false},
    medical_history: { type: DataTypes.TEXT }
  }, { timestamps: false });

  module.exports = Patient;

  // TODO - TALVEZ ESTEJA TUDO ERRADO, NÃO ESTAVA RACIOCINANDO BEM