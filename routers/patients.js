var express = require('express')
var router = express.Router()
const PatientController = require("../controllers/patientController")

router.get("/", PatientController.listAll)
router.get("/add", PatientController.addPatient)
router.post("/add", PatientController.addPatientPost)
router.get("/:patientId/edit", PatientController.editPatient)
router.post("/:patientId/edit", PatientController.editPatientPost)
router.get("/:patientId/assigndoctor", PatientController.assignDoctor)
router.post("/:patientId/assigndoctor", PatientController.assignDoctorPost)
router.get("/:patientId/delete", PatientController.delete)


module.exports = router