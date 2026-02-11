const express = require("express");
const router = express.Router();
const Inspections = require("../models/inspections");
const Users = require("../models/users");
const Transactions = require("../models/transactions");
const Accounts = require("../models/accounts");
const Tweets = require("../models/tweets");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const inspectionService = new CRUDService(Inspections);
const userService = new CRUDService(Users);
const transactionService = new CRUDService(Transactions);
const accountService = new CRUDService(Accounts);
const tweetService = new CRUDService(Tweets);

const LIMIT = 500;

const getDataHandler = async (service, res, message) => {
    try {
        const documents = await service.getAll({}, LIMIT);
        res.status(200).json(successResponse(200, message, documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
};

router.get("/getInspections", async (req, res, next) => {
    await getDataHandler(inspectionService, res, "Inspections fetched successfully!");
});

router.get("/getUsers", async (req, res, next) => {
    await getDataHandler(userService, res, "Users fetched successfully!");
});

router.get("/getTransactions", async (req, res, next) => {
    await getDataHandler(transactionService, res, "Transactions fetched successfully!");
});

router.get("/getSales", async (req, res, next) => {
    await getDataHandler(userService, res, "Sales fetched successfully!");
});

router.get("/getTweets", async (req, res, next) => {
    await getDataHandler(tweetService, res, "Tweets fetched successfully!");
});

router.get("/getAccounts", async (req, res, next) => {
    await getDataHandler(accountService, res, "Accounts fetched successfully!");
});

module.exports = router; 
