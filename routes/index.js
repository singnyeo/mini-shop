var express = require('express');
var router = express.Router();

/* GET Health check */
router.get('/', function(req, res, next) {
  res.send('OK');
});

module.exports = router;
