'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('cart', 'uuid', {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      after: 'id'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('cart', 'uuid');
  }
};
