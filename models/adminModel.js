const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Admin = sequelize.define('admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.TEXT, allowNull: false },
    phone_number: { type: DataTypes.STRING },
    sector: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Admin;

//! - NÃO VERIFICADO SE ESTÁ CORRETO NO DB