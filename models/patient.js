'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Patient extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Doctor)
      this.belongsTo(models.Disease)
    }

    showFullName() {
      return `${this.firstName} ${this.lastName}`
    }
  };
  Patient.init({
    firstName: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Nama tidak Boleh Kosong"
        }
      }
    },
    lastName: DataTypes.STRING,
    age: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Umur tidak Boleh Kosong"
        }
      }
    },
    address: DataTypes.STRING,
    DoctorId: DataTypes.INTEGER,
    DiseaseId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          args: true,
          msg: "Disease tidak Boleh Kosong"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Patient',
    hooks: {
      beforeCreate(value) {
        if (value.address === "") {
          value.address = "Tidak terdaftar"
        }
      }
    }

  });
  return Patient;
};