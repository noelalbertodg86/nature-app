var express = require("express");
var router = express.Router();

var ip = require("ip");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express: " + ip.address() });
  console.log(">>>>> IP", ip.address());
});

module.exports = router;
