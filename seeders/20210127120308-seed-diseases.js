'use strict';
let data = require("../data/diseases.json")

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
   let diseases = data.map((el) => {
    el.createdAt = new Date()
    el.updatedAt = new Date()
    return el
  })
  return queryInterface.bulkInsert('Diseases', diseases)
 },

 down: (queryInterface, Sequelize) => {
   /**
    * Add commands to revert seed here.
    *
    * Example:
    * await queryInterface.bulkDelete('People', null, {});
    */
   return queryInterface.bulkDelete('Diseases', null, {});
 }
};
