const express = require("express");
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SEC = process.env.JWT_SECRET || "SHRAVANISA$GOODBOY";
const fetchuser = require('../MiddleWare/fetchuser');

// ROUTE 1: Create a user (Sign up)
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  async (req, res) => {
    let success = false;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(400).json({ success, error: 'Sorry, a user with this email already exists' });
      }

      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SEC);
      success = true;
      res.json({ success, authToken });

    } catch (err) {
      console.error(err.message);
      res.status(500).send({ success: false, error: "An internal server error occurred" });
    }
  }
);

// ROUTE 2: Authenticate a user (Log in)
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ success, error: 'Invalid credentials' });
      }

      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).json({ success, error: 'Invalid credentials' });
      }

      const data = { user: { id: user.id } };
      const authToken = jwt.sign(data, JWT_SEC);
      success = true;
      res.json({ success, authToken });

    } catch (error) {
      console.error(error.message);
      res.status(500).send("Some error occurred");
    }
  }
);

// ROUTE 3: Reset Password
router.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, message: 'User with this email does not exist' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ success: true, message: 'Password has been reset' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// ROUTE 4: Get user details
router.post(
  "/getuser", fetchuser, async (req, res) => {
    try {
      userId = req.user.id;
      const user = await User.findById(userId).select("-password");
      res.send(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Some error occurred");
    }
  });

module.exports = router;
