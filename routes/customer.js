const express = require("express");
const router = express.Router();
const Customers = require("../models/customer");
const Transactions = require("../models/transactions");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { getCurrentTimestamp } = require("../utils/dateHelper");

const customerService = new CRUDService(Customers);
const transactionService = new CRUDService(Transactions);

router.get("/getCustomers", async (req, res, next) => {
    try {
        const documents = await customerService.getAll();
        res.status(200).json(successResponse(200, "Customers fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.get("/getCustomerCount", async (req, res, next) => {
    try {
        const count = await customerService.count();
        const transactionData = await transactionService.aggregate([
            { "$unwind": "$transactions" },
            { $group: { "_id": "tempId", "amount": { "$sum": "$transactions.amount" } } }
        ]);

        const totalAmount = transactionData.length > 0 ? transactionData[0].amount : 0;
        
        res.status(200).json(successResponse(200, "Customer count fetched", { 
            count, 
            totalTransactionAmount: totalAmount 
        }));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post("/saveCustomers", async (req, res, next) => {
    try {
        const customerData = {
            address: req.body.address,
            name: req.body.name,
            email: req.body.email,
            birthdate: req.body.birthdate,
            updatedBy: req.body.updatedBy,
            updatedDate: getCurrentTimestamp(),
            createdDate: getCurrentTimestamp(),
            accounts: req.body.accounts,
            tier_and_details: req.body.tier_and_details,
            username: req.body.username
        };

        const result = await customerService.create(customerData);
        res.status(200).json(successResponse(200, "Customer saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post("/deleteCustomer", async (req, res, next) => {
    try {
        const result = await customerService.deleteById(req.body.id);
        res.status(200).json(successResponse(200, "Customer deleted successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post("/updateCustomer", async (req, res, next) => {
    try {
        const updateData = {
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            birthdate: req.body.birthdate,
            updatedBy: req.body.updatedBy,
            updatedDate: getCurrentTimestamp()
        };

        const result = await customerService.updateById(req.body.id, updateData);
        res.status(200).json(successResponse(200, "Customer updated successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
