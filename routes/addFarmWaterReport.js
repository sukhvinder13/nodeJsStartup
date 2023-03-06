const express = require("express");
const router = express.Router();
const AddFarmWaterReport=require("../models/addFarmWaterReport");


//posting the data
router.post('/addFarmWaterReport', (req, res) => {
   
    console.log('farm Water REport')
    const AddFarmWaterReport1 = new AddFarmWaterReport({
        farmId:req.body.farmOwner,
        tank: req.body.selectTank,
        time: req.body.selectTime,
         ph: req.body.selectPH
    })
    AddFarmWaterReport1.save((err, result) => {
        if (err) {
            console.log("error saving farm water report.")
            console.log(err.message);
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while saving farm medicin',
                err: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: "farms water report saved successfully"
            });
        }

    })
})
module.exports = router; 
