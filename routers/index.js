const express = require('express')
const router = express.Router()
const diseases = require("./diseases")
const patients = require("./patients")
const doctors = require("./doctors")

router.use('/diseases/', diseases)
router.use('/patients/', patients)
router.use('/doctors/', doctors
)
router.get('/', (req, res) => res.render("index/home"))

module.exports = router