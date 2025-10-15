const db = require("../db/models");

const listUsers = async () => {
  try {
    const users = await db.users.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserByUUID = async (uuid) => {
  try {
    const user = await db.users.findOne({ where: { uuid } });
    return user ? JSON.parse(JSON.stringify(user)) : null;
  } catch (error) {
    throw error;
  }
};

const getUserByEmail = async (email) => {
  try {
    const user = await db.users.findOne({ where: { email, is_active: true } });
    return user;
  } catch (error) {
    throw error;
  }
};

const createUser = async (userData) => {
  try {
    const newUser = await db.users.create(userData);
    return newUser;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (uuid, userData) => {
  try {
    const updatedUser = await db.users.update(userData, { where: { uuid } });
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (uuid) => {
  try {
    const result = await db.users.destroy({ where: { uuid } });
    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  listUsers,
  getUserByUUID,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser,
};
