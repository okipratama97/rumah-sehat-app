'use strict';
const {
  Model
} = require('sequelize');

const transporter = require("../helpers/nodemailer")

module.exports = (sequelize, DataTypes) => {
  class Doctor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Patient)
      this.belongsToMany(
        models.Disease,
        {
          through: "DoctorDiseases"
        }
      )
    }

    static sendMail(instance) {
      return new Promise((resolve, reject) => {
        let patients = []
        let text

        if (instance.Patients) {
          console.log(instance.Patients);
          if (instance.Patients[0] !== undefined) {
            instance.Patients.forEach(el => {
              patients.push(el.showFullName())
            })
            text = `Good day, Doctor ${instance.firstName} \n\n Your patients today are: \n${patients.join("\n")}`
          } else {
            text = `Good day, Doctor ${instance.firstName}. You don't have any patients today`
          }
        }

        const mailOptions = {
          from: 'warmtugas21@gmail.com',
          to: `${instance.email}`,
          subject: 'Patients Report',
          text: text
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) reject(err)
          else {
            resolve('Email sent to : ' + info.accepted[0])
          }
        });
      })
    }

    showFullName() {
      return `${this.firstName} ${this.lastName}`
    }
  };
  Doctor.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    age: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Doctor',
  });
  return Doctor;
};