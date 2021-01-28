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
        res.render("doctors/seePatients", { data: data })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }

  static sendMail(req, res) {
    res.send("Send Mail")
  }
}

module.exports = DoctorController