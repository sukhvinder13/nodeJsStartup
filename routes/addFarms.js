const express = require("express");
const router = express.Router();
const AddFarm = require("../models/addFarm");
const Tanks = require("../models/tanks");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");
const { generateRandomId, generateTankId } = require("../utils/idGenerator");

const farmService = new CRUDService(AddFarm);
const tankService = new CRUDService(Tanks);

router.get("/readFarm", async (req, res, next) => {
    try {
        const documents = await farmService.getAll();
        res.status(200).json(successResponse(200, "Farms fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post('/addfarm', async (req, res, next) => {
    try {
        const farmData = {
            farmId: generateRandomId('farm_'),
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
            tankCode: req.body.tankCode,
            tankArea: req.body.tankArea
        };

        const addFarm = await farmService.create(farmData);
        await createTanks(addFarm);
        
        res.status(200).json(successResponse(200, "Farm and tanks saved successfully!", addFarm));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.delete("/deletefarm/:id", async (req, res, next) => {
    try {
        const result = await farmService.deleteById(req.params.id);
        res.status(200).json(successResponse(200, "Farm deleted successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

async function createTanks(addFarm) {
    const tankDetails = [];
    for (let i = 0; i < addFarm.noOfTanks; i++) {
        tankDetails.push({ farmId: addFarm.farmId, tankId: generateTankId(i) });
    }
    await tankService.insertMany(tankDetails);
}

module.exports = router; 