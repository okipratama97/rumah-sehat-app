var express = require('express')
var router = express.Router()
const DiseaseController = require("../controllers/diseaseController")

router.get("/", DiseaseController.listAll)

module.exports = router