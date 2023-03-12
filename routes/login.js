const express = require("express");
const router = express.Router();
const Users=require("../models/login");


//posting the data
router.post('/login', (req, res) => {
   
    console.log(req)
   
    Users.findOne({'email':req.body.email},function(err,user){
        if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        if(user) return res.json({isAuth : true,token:user, message : ' Auth Success ,email found'});
    })
})
module.exports = router; 
