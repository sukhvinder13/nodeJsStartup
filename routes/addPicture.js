const express = require("express");
const router = express.Router();
// const apiDetails = require("../apiDetails");
const AddPicture = require("../models/addPicture");

const multer = require("multer")
const path = require("path");

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploadedImages/pondpreparation/")
        },
        filename: function (req, file, cb) {
            var randomno = Math.floor(Math.random() * 90000) + 10000;
            req.body.conditionFilePath = randomno + "_pondpreparation" + path.extname(file.originalname);
            cb(null, randomno + "pondpreparation" + path.extname(file.originalname))
        },
    })
})

router.post('/addPicture', (req, res) => {
   
    console.log('add picture');
    const AddPicture1 = new AddPicture({
        farmId: req.body.farmId,
        tankId: req.body.tankId,
        pictureFilePath: req.body.conditionFilePath
    })
    AddPicture1.save((err, result) => {
        if (err) {
            console.log("error saving adding picture.")
            console.log(err.message);
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while saving add picture',
                err: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: "picture saved successfully"
            });
            console.log(result);
        }

    })
})
module.exports = router; 
