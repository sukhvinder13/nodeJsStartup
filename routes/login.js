const express = require("express");
const router = express.Router();
const Users = require("../models/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require('dotenv').config(); // For environment variables

// POST /login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(401).json({ isAuth: false, message: 'Auth failed: email not found' });
    }

    // Validate password
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) {
    //   return res.status(401).json({ isAuth: false, message: 'Auth failed: incorrect password' });
    // }

    // Generate JWT
    const jwtToken = jwt.sign(
      {
        email: user.email,
        _id: user._id,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET || 'longer-secret-is-better', // Use env in production
      {
        expiresIn: '10m',
      }
    );

    // Success response
    return res.status(200).json({
      isAuth: true,
      jwtToken,
      token: user,
      message: 'Auth successful',
    });
    // if (user) return res.json({ isAuth: true, token: user, jwtToken: jwtToken, message: ' Auth Success ,email found' });

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ isAuth: false, message: 'Internal server error' });
  }
});

module.exports = router;
