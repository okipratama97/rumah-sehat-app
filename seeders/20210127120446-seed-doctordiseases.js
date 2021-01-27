'use strict';
let data = require("../data/doctordiseases.json")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  return queryInterface.bulkInsert('DoctorDiseases', data)
 },

 down: (queryInterface, Sequelize) => {
   /**
    * Add commands to revert seed here.
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('DoctorDiseases', null, {});
 }
};
