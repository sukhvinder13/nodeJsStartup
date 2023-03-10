const express = require("express");
const router = express.Router();
const AddFarm = require("../models/addFarm");
const Customers = require("../models/customer");
const Inspections = require("../models/inspections");
const Tanks = require("../models/tanks");
const Users = require("../models/users");
const Transactions = require("../models/transactions");
const Sales = require("../models/users");
const Tweets = require("../models/users");
const Accounts = require("../models/accounts");

router.get("/readFarm", (req, res, next) => {
    AddFarm.find().then(documents => {
        res.status(200).json({
            message: "Farms fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getCustomers", (req, res, next) => {
    Customers.find().then(documents => {
        res.status(200).json({
            message: "Customers fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getInspections", (req, res, next) => {
    Inspections.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Inspections fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getUsers", (req, res, next) => {
    Users.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Users fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getTransactions", (req, res, next) => {
    Transactions.find().limit(250).then(documents => {
        res.status(200).json({
            message: "Transactions fetched successfully!",
            Transactions: documents
        });
    });
});
router.get("/getSales", (req, res, next) => {
    Sales.find().limit(100).then(documents => {
        res.status(200).json({
            message: "Sales fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getTweets", (req, res, next) => {
    Tweets.find().limit(100).then(documents => {
        res.status(200).json({
            message: "Tweets fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getAccounts", (req, res, next) => {
    Accounts.find().limit(100).then(documents => {
        res.status(200).json({
            message: "Accounts fetched successfully!",
            posts: documents
        });
    });
});

router.post('/addfarm', (req, res) => {
    // var AddFarmData = req.body;
    // var addFarm = new AddFarm(AddFarmData);
    console.log('hello')
    const addFarm = new AddFarm({
        farmId: 'farm_' + Math.round(Math.random() * 100000), //created a random id which will be refered anywhere else related to this farm
        farmOwner: req.body.farmOwner,
        farmHistory: req.body.farmHistory,
        village: req.body.village,
        mandal: req.body.mandal,
        city: req.body.city,
        state: req.body.state,
        zip: req.body.zip,
        country: req.body.country,
        noOfTanks: req.body.noOfTanks,
        noOfEmployess: req.body.noOfEmployess,
        tankCode:req.body.tankCode,
        tankArea:req.body.tankArea
    })
    addFarm.save((err, result) => {
        if (err) {
            console.log("error saving farm.")
            console.log(err.message);
            console.log(result);
            console.log(err);
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while saving farm',
                err: err
            });
        } else {
            addTanks(addFarm, req, res);
        }

    })
})
//http://ip:3000/addfarm/ghewghdghdew
//delete service
router.delete("/deletefarm/:id", (req, res, next) => {
    AddFarm.deleteOne({ _id: req.params.id }).then(result => {
        console.log(result);
        res.status(200).json({ message: "Farm deleted!" });
    });
});

function addTanks(addFarm, req, res) {
    let tankDetails = [];
    // loop the no of tanks coming from frontend and make ready array of object to ssave data in database directly
    // remember this is just a basic for loop which wont effect/delay any more, 
    //rather if u will run loop to save each record directly it will delay because of asynchronious nature of nodejs,
    //so mongo have given a function as insertMany to insert multiple record at a single call, lets use it

    for (let i = 0; i < addFarm.noOfTanks; i++) {
        var tankId1 =i;
        tankId1++;
        tankDetails.push({ farmId: addFarm.farmId, tankId: 'T' + tankId1 });
    }

    //use the inserMany function to insert multiple records at a single time
    Tanks.insertMany(tankDetails, function (err, tanks) {
        if (err) {
            res.send({
                status:500,
                success: false,
                message: "error based on original error",
                error: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: "farms and tanks saved successfully"
            });
        }
    });
}


module.exports = router; 