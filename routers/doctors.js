var express = require('express')
var router = express.Router()
const DoctorController = require("../controllers/doctorController")

router.get("/", DoctorController.listAll)
router.get("/:doctorId/seepatients", DoctorController.seePatients)
router.get("/:doctorId/sendmail", DoctorController.sendMail)

module.exports = router