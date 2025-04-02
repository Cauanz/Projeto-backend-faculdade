const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Patient = sequelize.define("patient", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  birth_date: { type: DataTypes.DATEONLY, allowNull: false },
  cpf: { type: DataTypes.STRING, allowNull: false },
  address: { type: DataTypes.STRING, allowNull: false },
  telefone: { type: DataTypes.STRING, allowNull: false },
  medical_history: { type: DataTypes.JSON }
}, { timestamps: false });

  module.exports = Patient;

  // TODO - TEM QUE RECRIAR A TABELA patients NO POSTGRES PARA BATER COM ESSA SE NÃO NÃO VAI FUNCIONAR