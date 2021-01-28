const express = require('express')
const router = express.Router()
const diseases = require("./diseases")
const patients = require("./patients")
const doctors = require("./doctors")
const SessionController = require("../controllers/sessionController")
const validate = require("../middlewares/validate")

router.use('/diseases/', validate, diseases)
router.use('/patients/', validate, patients)
router.use('/doctors/', validate, doctors
)
router.get('/', validate, (req, res) => res.render("index/home"))
router.get('/login', SessionController.login)
router.post('/login', SessionController.loginPost)
router.get('/logout', SessionController.logout)

module.exports = router