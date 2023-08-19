const express = require("express");
const router = express.Router();
const Customers = require("../models/customer");
const Transactions = require("../models/transactions");
let estimate = 0;
let transactionCount = 0;
let totalTransactionAmount = 0;

router.get("/getCustomers", (req, res, next) => {
    Customers.find().then(documents => {
        res.status(200).json({
            message: "Customers fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getCustomerCount", (req, res, next) => {
    res.send({
        status: 200,
        success: true,
        message: 'Customer count',
        transactionCount: estimate,
        totalValue: totalTransactionAmount
    });
    run();
});
router.post("/saveCustomers", (req, res, next) => {
    const addCustomer = Customers({
        address: req.body.address,
        name: req.body.name,
        email: req.body.email,
        birthdate: req.body.birthdate
    })
    addCustomer.save((err, result) => {
        if (err) {
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
                message: 'Success',
                result: result
            });
        }

    })
});
router.post("/deleteCustomer", (req, res, next) => {
    console.log(req.body.id)
    Customers.deleteOne({ _id: req.body.id }).then(result => {
        // console.log(result);
        res.send({
            status: 200,
            success: true,
            message: 'Deleted Successfully',
            result: result
        });
    });
});
router.post("/updateCustomer", (req, res, next) => {
    Customers.updateOne({ _id: req.body.id }, {
        name: req.body.name,
        address: req.body.address,
        email: req.body.email,
        birthdate: req.body.birthdate
    }, function (err, result) {

        if (err) {
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while updating',
                err: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: 'Updated Successfully',
                result: req.body
            });
        }
    });
});
async function run() {
    try {
        //   const movies = Customers.collection("movies");
        // Estimate the total number of documents in the collection
        // and print out the count.
        group = 0
        estimate = await Customers.estimatedDocumentCount();
        transactionCount = await Transactions.aggregate([
            {
                "$unwind": "$transactions"
            },
            {
                $group: {
                    "_id": "tempId",
                    "amount": {
                        "$sum": "$transactions.amount"
                    }
                }
            }
        ]);
        totalTransactionAmount=transactionCount[0].amount
        return estimate, totalTransactionAmount
    } finally {
        //   await client.close();
    }
}
module.exports = router; 
