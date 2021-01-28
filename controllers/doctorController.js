const { Doctor, Patient, Disease } = require("../models")

class DoctorController {
  static listAll(req, res) {
    Doctor
      .findAll()
      .then(data => {
        res.render("doctors/doctorList", { data: data })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static seePatients(req, res) {
    let id = req.params.doctorId

    Doctor
      .findByPk(id, {
        include: {
          model: Patient,
          include: [Disease]
        }
      })
      .then(data => {
        let emailRespond = req.session.mail || null
        req.session.mail = null
        res.render("doctors/seePatients", { data: data, alertmsg: emailRespond })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static sendMail(req, res) {
    let id = req.params.doctorId

    Doctor
      .findByPk(id, { include: [Patient] })
      .then(data => {
        return Doctor.sendMail(data)
      })
      .then(respond => {
        req.session.mail = respond
        res.redirect(`/doctors/${id}/seepatients`)
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = DoctorController