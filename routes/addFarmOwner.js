const express = require("express");
const router = express.Router();
const AddFarmowner = require("../models/addFarmOwner");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const farmOwnerService = new CRUDService(AddFarmowner);

router.get("/readFarmOwner", async (req, res, next) => {
    try {
        const documents = await farmOwnerService.getAll();
        res.status(200).json(successResponse(200, "Farm owners fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post('/addfarmowner', async (req, res, next) => {
    try {
        const farmOwnerData = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            mobile: req.body.mobile
        };

        const result = await farmOwnerService.create(farmOwnerData);
        res.status(200).json(successResponse(200, "Farm owner saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
