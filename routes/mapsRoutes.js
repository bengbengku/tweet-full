const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const User = require("../schemas/UserSchema");

router.get("/", (req, res, next) => {
  var payload = {
    pageTitle: "View Maps",
    userLoggedIn: req.session.user,
    userLoggedInJs: JSON.stringify(req.session.user),
    profileUser: req.session.user,
  };

  res.status(200).render("mapsPage", payload);
});



module.exports = router;
