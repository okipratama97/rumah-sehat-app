const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require("./routers/index")
const session = require("express-session")

app.set('view engine', 'ejs')
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true
  })
)
app.use(express.urlencoded({ extended: true }))
app.use("/", router)

app.listen(port, () => {
  console.log(`Rumah sehat listening at http://localhost:${port}`)
})