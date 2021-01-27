'use strict';
let data = require("../data/doctors.json")

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   let doctors = data.map((el) => {
     el.createdAt = new Date()
     el.updatedAt = new Date()
     return el
   })
   return queryInterface.bulkInsert('Doctors', doctors)
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Doctors', null, {});
  }
};
