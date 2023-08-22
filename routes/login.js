const express = require("express");
const router = express.Router();
const Users = require("../models/login");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")

//posting the data
router.post('/login', (req, res) => {
  let jwtToken;
  // login()
  Users.findOne({ 'email': req.body.email }, function (err, user) {
    if (user) {
      jwtToken = jwt.sign(
        {
          email: user.email,
          _id: user._id,
          name: user.name,
            role: user.role,
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
function login(){

const passwordEnteredByUser = "mypass123"
const hash = "$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K"

bcrypt.compare(passwordEnteredByUser, hash, function(error, isMatch) {
  if (error) {
    throw error
  } else if (!isMatch) {
    console.log("Password doesn't match!")
  } else {
    console.log("Password matches!")
  }
});
const password = "mypass123"
const saltRounds = 10

bcrypt.genSalt(saltRounds, function (saltError, salt) {
  if (saltError) {
    throw saltError
  } else {
    bcrypt.hash(password, salt, function(hashError, hash) {
      if (hashError) {
        throw hashError
      } else {
        console.log(hash)
        //$2a$10$FEBywZh8u9M0Cec/0mWep.1kXrwKeiWDba6tdKvDfEBjyePJnDT7K
      }
    })
  }
})
}
module.exports = router; 
