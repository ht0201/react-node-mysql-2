const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");

//Register
router.post("/", (req, res) => {
  const { username, password } = req.body;
  bcrypt
    .hash(password, 10)
    .then((hash) => {
      Users.create({
        username,
        password: hash,
      });

      res.json("SUCCESS");
    })
    .catch((error) => {
      console.log(error);
    });
});

//Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await Users.findOne({ where: { username: username } });
    console.log(user);

    // res.setHeader("Content-Type", "json/application");

    if (!user) {
      res.json({ error: "User doesnt exits" });
    }

    bcrypt
      .compare(password, user?.password)
      .then((match) => {
        if (!match) {
          res.json({ error: "Password is wrong" });
        }
        res.json("You logged in");
      })
      .catch((err) => {
        console.log(err);
      });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
