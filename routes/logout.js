const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const router = express.Router()

app.use(bodyParser.urlencoded({ extended: false }))

router.get('/', (req, res, next) => {
  if (req.session) {
    req.session.destroy(() => {
      res.redirect('/login')
    })
  }
})

module.exports = router
