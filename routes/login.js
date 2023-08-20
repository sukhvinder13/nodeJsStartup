const express = require("express");
const router = express.Router();
const Users = require("../models/login");
const jwt = require("jsonwebtoken");

//posting the data
router.post('/login', (req, res) => {
  let jwtToken;
  Users.findOne({ 'email': req.body.email }, function (err, user) {
    if (user) {
      jwtToken = jwt.sign(
        {
          email: user.email,
          _id: user._id,
          name: user.name
          //   userId: getUser._id,
        },
        'longer-secret-is-better',
        {
          expiresIn: '10m',
        },
      )
    }
    if (!user) return res.json({ isAuth: false, message: ' Auth failed ,email not found' });
    if (user) return res.json({ isAuth: true, token: user, jwtToken: jwtToken, message: ' Auth Success ,email found' });
  })
})
module.exports = router; 
