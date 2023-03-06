const express = require("express");
const router = express.Router();
const apiDetails = require("../apiDetails");
const CultivationModel = require("../models/Cultivation");

router.post(apiDetails.cultivation.save.api_url, (req, res) => {
    console.log(req.params);
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
            if(err.code==11000){
                errormessage.errormessage = 'feed_name and tank_name both are combinely unique'
            }else{
                errormessage.errormessage = 'feed_name and tank_name both are required field'
            }
            res.send(errormessage);
        }else{
            res.send({
                status: 200,
                success: true,
                message: "Cultivation feed Saved Successfully"
            });
        }
    })
});

module.exports = router;