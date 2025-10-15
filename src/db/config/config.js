require("dotenv").config();

const base = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  dialect: process.env.DB_DIALECT || "mysql",
};

module.exports = {
  development: {
    ...base,
    logging: false,
  },
  test: {
    ...base,
    logging: false,
  },
  production: {
    ...base,
    logging: false,
  },
};
