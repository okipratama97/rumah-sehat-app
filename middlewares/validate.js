module.exports =  function validate(req, res, next)  {
  if (req.session.login === true) {
    next()
  }else {
    res.redirect("/login")
  }
}