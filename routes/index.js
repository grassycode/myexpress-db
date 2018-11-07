var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req.headers.authorization)
  // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // res.header('Access-Control-Allow-Headers', 'Content-Type');

  res.json({ title: 'Express' });
  res.send()
});

module.exports = router;
