'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('category', [
      {
        "name": "Electronics",
      },
      {
        "name": "Fashion",
      },
      {
        "name": "Home & Garden",
      },
      {
        "name": "Health & Beauty",
      },
      {
        "name": "Books, Movies & Music",
      },
      {
        "name": "Sports & Outdoors",
      },
      {
        "name": "Toys & Hobbies",
      },
      {
        "name": "Automotive",
      },
      {
        "name": "Pet Supplies",
      },
      {
        "name": "Food & Beverages",
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('category', null, {});
  }
};
