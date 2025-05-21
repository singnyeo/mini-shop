var express = require("express");
const { assert } = require("superstruct");
const { SignUpDto } = require("../dtos/users.dto");
const { db } = require("../utils/db");

var router = express.Router();

router.get("/list", async function (req, res, next) {
  const users = await db.user.findMany({
    include: {
      userPreference: true,
    },
  });
  res.json(users);
});

router.post('/signup', async function(req, res, next) {
  assert(req.body, SignUpDto);

  const { email, firstName, lastName, userPreference } = req.body;
  const { receiveEmail } = userPreference;

  const user = await db.$transaction(async (tx) => {
    const user = await tx.user.create({
      data: { email, firstName, lastName },
    });
    await tx.userPreference.create({
      data: { receiveEmail, user_id: user.id },
    });

    return user;
  });

  res.json({ id: user.id });
});

module.exports = router;
