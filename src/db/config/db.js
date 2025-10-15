// src/config/db.js
const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    dialect: process.env.DB_DIALECT || "mysql",
    logging: false,
    define: {
      underscored: true,
      freezeTableName: false,
      timestamps: true,
    },
  }
);

module.exports = sequelize;
