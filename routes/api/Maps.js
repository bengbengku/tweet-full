const express = require("express");
const app = express();
const router = express.Router();
const bodyParser = require("body-parser");
const Maps = require('../../schemas/MapsSchema')

app.use(bodyParser.urlencoded({ extended: false }));

router.get("/", async (req, res, next) => {
  const maps = await Maps.find();
  res.json(maps);
});


module.exports = router;
