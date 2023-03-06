const express = require("express");
const router = express.Router();
const apiDetails = require("../apiDetails");
const CultivationModel = require("../models/Cultivation");

const multer = require("multer")
const path = require("path");

let upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploadedImages/cultivations/")
        },
        filename: function (req, file, cb) {
            var randomno = Math.floor(Math.random() * 90000) + 10000;
            req.body.conditionFilePath = randomno + "_cultivation" + path.extname(file.originalname);
            cb(null, randomno + "cultivation" + path.extname(file.originalname))
        },
    })
})

router.post(apiDetails.cultivation.saveWithImage.api_url, upload.single("file"), (req, res) => {
    console.log(req.params);
    console.log(req.body);

    req.body.type = req.params.type;
    let cultivation = new CultivationModel(req.body);
    cultivation.save((err, success) => {
        if (err) {
            var errormessage = {
                status: 500,
                success: false,
                message: "backend error occured while saving cultivation feed",
                error: err
            }
            if (err.code == 11000) {
                errormessage.errormessage = 'feed_name and tank_name both are combinely unique'
            } else {
                errormessage.errormessage = 'feed_name and tank_name both are required field'
            }
            res.send(errormessage);
        } else {
            res.send({
                status: 200,
                success: true,
                message: "Cultivation feed Saved Successfully"
            });
        }
    })
})

module.exports = router;