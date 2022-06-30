const express = require("express");
const router = express.Router();
const { User, validate } = require("../models/User");
const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//CreateUSer, in this app use postman
router.post("/", async (req, res) => {
  try {

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.Password, salt);
    await new User({ ...req.body, Password: hashPassword }).save();

    res.status(201).send({ message: "User Created Succesfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Login for the first time, compare passowrd and genarte token.
router.post("/Login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ WN: req.body.WN });
    if (!user)
      return res.status(401).send({ message: "Invalid User Name or Password" });

    const validPassword = await bcrypt.compare(
      req.body.Password,
      user.Password
    );
    if (!validPassword)
      return res.status(401).send({ message: "Invalid User Name or Password" });

    const token = user.generateAuthToken();
    return res.status(200).send({
      Name: user.userName,
      data: token,
      message: "Logged In Successfully",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Aotumatic Login, recixe a token from the client and check for authorization.
router.get("/", async (req, res) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, user) => {
    if (err) return res.sendStatus(403);

    var userId = user._id;
    User.findOne({ _id: userId }).then(function (u) {
      return res.status(200).send({Name: u.userName, data: token, message: "Logged In Successfully"});
    });
  });
});

module.exports = router;
