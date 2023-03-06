const express = require("express");
const router = express.Router();
const AddFarmMedicine=require("../models/addFarmMedicin");


//posting the data
router.post('/addFarmMedicine', (req, res) => {
   
    console.log('farm Medicine');
    console.log(req.body.farmOwner);
    console.log(req.body.selectTank);
    const AddFarmMedicine1 = new AddFarmMedicine({
        farm_owner: req.body.farmOwner,
        tank: req.body.selectTank,
        medicine: req.body.selectMedicine,
         dosage: req.body.dosage
    })
    AddFarmMedicine1.save((err, result) => {
        if (err) {
            console.log("error saving farm medicine.")
            console.log(err.message);
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while saving farm medicine',
                err: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: "farms medicin saved successfully"
            });
            console.log(result);
        }

    })
})
module.exports = router; 
