const express = require("express");
const router = express.Router();
const AddFarmMedicine = require("../models/addFarmMedicin");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const medicineService = new CRUDService(AddFarmMedicine);

router.post('/addFarmMedicine', async (req, res, next) => {
    try {
        const medicineData = {
            farm_owner: req.body.farmOwner,
            tank: req.body.selectTank,
            medicine: req.body.selectMedicine,
            dosage: req.body.dosage
        };

        const result = await medicineService.create(medicineData);
        res.status(200).json(successResponse(200, "Farm medicine saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
