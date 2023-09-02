const express = require("express");
const router = express.Router();
const Inspections = require("../models/inspections");
const Users = require("../models/users");
const Transactions = require("../models/transactions");
const Sales = require("../models/users");
// const Tweets = require("../models/users");
const Accounts = require("../models/accounts");
const Tweets = require("../models/tweets");


router.get("/getInspections", (req, res, next) => {
    Inspections.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Inspections fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getUsers", (req, res, next) => {
    Users.find().limit(450).then(documents => {
        res.status(200).json({
            message: "Users fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getTransactions", (req, res, next) => {
    Transactions.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Transactions fetched successfully!",
            Transactions: documents
        });
    });
});
router.get("/getSales", (req, res, next) => {
    Sales.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Sales fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getTweets", (req, res, next) => {
    Tweets.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Tweets fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getAccounts", (req, res, next) => {
    Accounts.find().limit(500).then(documents => {
        res.status(200).json({
            message: "Accounts fetched successfully!",
            posts: documents
        });
    });
});
module.exports = router; 
