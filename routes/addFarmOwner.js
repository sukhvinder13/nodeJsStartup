const express = require("express");
const router = express.Router();
const AddFarmowner=require("../models/addFarmOwner");

//getting the records
router.get("/readFarmOwner", (req, res, next) => {
    AddFarmowner.find().then(documents => {
        res.status(200).json({
            message: "Farms Owner fetched successfully!",
            posts: documents
        });
    });
});

//posting the data
router.post('/addfarmowner', (req, res) => {
   
    console.log('farm owner')
    const AddFarmOwner1 = new AddFarmowner({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        mobile: req.body.mobile,
        // address: req.body.address,
        // referral: req.body.referral,
        // pan: req.body.pan,
        // adhaar: req.body.adhaar,
        // panFile: req.body.panFile,
        // adhaarFile: req.body.adhaarFile,
        // companyName: req.body.companyName,
        // companyPan: req.body.companyPan,
        // companyAdhaar: req.body.companyAdhaar,
        // companyGstNo: req.body.companyGstNo,
        // companyPanFile: req.body.companyPanFile,
        // companyAdhaarFile: req.body.companyAdhaarFile
    })
    AddFarmOwner1.save((err, result) => {
        if (err) {
            console.log("error saving farm owner.")
            console.log(err.message);
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while saving farm',
                err: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: "farms owner saved successfully"
            });
        }

    })
})
module.exports = router; 
