const { compare } = require("../helpers/bcrypt")

class SessionController {
  static login(req, res) {
    res.render("index/login")
  }

  static loginPost(req, res) {
    const usernameHC = "admin"
    const passwordHC = "$2a$10$Pk8qTBTXmtBvhwQYHt3EeuBTU2WVRM6jCD7ZeP9qcwZhjEQ9kxXRK"
    const username = req.body.username
    const password = req.body.password

    if ((username === usernameHC) && (compare(password, passwordHC))) {
      req.session.login = true
      res.redirect("/")
    } else {
      res.redirect("/login")
    }
  }

  static logout(req, res) {
    req.session.login = false
    res.redirect("/login")
  }
}

module.exports = SessionController