var express = require('express');
const { assert } = require('superstruct');
const { SignUpDto } = require('../dtos/user.dto');
const { db } = require('../utils/db');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', async function(req, res, next) {
  assert(req.body, SignUpDto);

  const { email, firstName, lastName, userPreference } = req.body;
  const { receiveEmail } = userPreference;

  const user = await db.user.create({
    data: { email, firstName, lastName },
  });
  await db.userPreference.create({
    data: { receiveEmail, user_id: user.id },
  });

  res.json({ id: user.id });
});

module.exports = router;
