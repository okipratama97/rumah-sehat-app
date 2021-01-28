const { Patient, Doctor, Disease } = require("../models")
const { showDoctorName, shortValue } = require("../helpers/helper");

class PatientController {
  static listAll(req, res) {
    Patient
      .findAll({
        include: [Disease, Doctor],
        order: [['id']]
      })
      .then(data => {
        res.render("patients/patientList", { data: data, showDoctorName, shortValue })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static addPatient(req, res) {
    Disease
      .findAll()
      .then(options => {
        let errors = req.session.errors || null
        req.session.errors = null
        res.render("patients/addPatient", { options: options, errors: errors })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static addPatientPost(req, res) {
    let { firstName, lastName, age, address, DiseaseId } = req.body
    let input = { firstName, lastName, age, address, DiseaseId }
    input.DiseaseId = input.DiseaseId ? input.DiseaseId : ""
    Patient
      .create(input)
      .then(_ => {
        res.redirect("/patients")
      })
      .catch(err => {
        console.log(err);
        let errors = []
        err.errors.forEach(er => {
          errors.push(er.message)
        });
        req.session.errors = errors.join("\n")
        res.redirect(`/patients/add`)
      })
  }

  static editPatient(req, res) {
    let id = req.params.patientId
    let patientData

    Patient
      .findByPk(id)
      .then(data => {
        patientData = data
        return Disease.findAll()
      })
      .then(options => {
        let errors = req.session.errors || null
        req.session.errors = null
        res.render("patients/editPatient", { data: patientData, options: options, errors: errors })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static editPatientPost(req, res) {
    let id = req.params.patientId
    let { firstName, lastName, age, address, DiseaseId } = req.body
    let input = { firstName, lastName, age, address, DiseaseId }

    Patient
      .update(
        input,
        { where: { id: id } }
      )
      .then(_ => {
        res.redirect("/patients")
      })
      .catch(err => {
        console.log(err);
        let errors = []
        err.errors.forEach(er => {
          errors.push(er.message)
        });
        req.session.errors = errors.join("\n")
        res.redirect(`/patients/${id}/edit`)
      })
  }

  static assignDoctor(req, res) {
    let id = req.params.patientId
    let patientData

    Patient
      .findByPk(id)
      .then(data => {
        patientData = data
        return Doctor.findAll({
          include: {
            model: Disease,
            where: { id: patientData.DiseaseId }
          },
        })
      })
      .then(options => {
        let errors = req.session.errors || null
        req.session.errors = null
        res.render("patients/assignDoctor", { data: patientData, options: options, errors: errors })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static assignDoctorPost(req, res) {
    let id = req.params.patientId
    let DoctorId = req.body.DoctorId
    let input = { DoctorId }

    Patient
      .update(
        input,
        { where: { id: id } }
      )
      .then(_ => {
        res.redirect("/patients")
      })
      .catch(err => {
        console.log(err);
        let errors = []
        err.errors.forEach(er => {
          errors.push(er.message)
        });
        req.session.errors = errors.join("\n")
        res.redirect(`/patients/${id}/assigndoctor`)
      })
  }

  static delete(req, res) {
    let id = req.params.patientId
    Patient
      .destroy({
        where: { id: id }
      })
      .then(_ => {
        res.redirect("/patients")
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

}

module.exports = PatientController