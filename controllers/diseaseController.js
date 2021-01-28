const { Disease } = require("../models")

class DiseaseController {
  static listAll(req, res) {
    Disease
      .findAll()
      .then(data => {
        res.render("diseases/diseaseList", { data: data })
      })
      .catch(err => {
        console.log(err);
        res.send(err)
      })
  }
}

module.exports = DiseaseController