'use strict';

module.exports = {
  up:  (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    return queryInterface.createTable('DoctorDiseases', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      DoctorId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Doctors",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      DiseaseId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Diseases",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      }
    });
  },

  down:  (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return queryInterface.dropTable('DoctorDiseases');
  }
};
