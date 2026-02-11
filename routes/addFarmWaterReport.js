const express = require("express");
const router = express.Router();
const AddFarmWaterReport = require("../models/addFarmWaterReport");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const waterReportService = new CRUDService(AddFarmWaterReport);

router.post('/addFarmWaterReport', async (req, res, next) => {
    try {
        const waterReportData = {
            farmId: req.body.farmOwner,
            tank: req.body.selectTank,
            time: req.body.selectTime,
            ph: req.body.selectPH
        };

        const result = await waterReportService.create(waterReportData);
        res.status(200).json(successResponse(200, "Farm water report saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
