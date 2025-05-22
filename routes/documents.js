var express = require('express');
var router = express.Router();
const { db } = require('../utils/db');

router.get('/', async (req, res, next) => {
  const docs = await db.document.findMany({
    orderBy : {createdAt : 'desc'},
    skip : 0,
    take : 10,
  });
  const count = await db.document.count();

  res.json({requestTime : req.requestTime, documents: docs, count});
});

module.exports = router;