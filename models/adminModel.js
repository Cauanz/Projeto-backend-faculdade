const { DataTypes } = require('sequelize');
const sequelize = require("../db");

const Admin = sequelize.define('Admin', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password_hash: { type: DataTypes.TEXT, allowNull: false },
    phone: { type: DataTypes.STRING },
    sector: { type: DataTypes.STRING }
}, { timestamps: false });

module.exports = Admin;
