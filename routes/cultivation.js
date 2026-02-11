const express = require("express");
const router = express.Router();
const apiDetails = require("../apiDetails");
const CultivationModel = require("../models/Cultivation");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const cultivationService = new CRUDService(CultivationModel);

router.post(apiDetails.cultivation.save.api_url, async (req, res, next) => {
    try {
        req.body.type = req.params.type;
        const result = await cultivationService.create(req.body);
        
        res.status(200).json(successResponse(200, "Cultivation feed saved successfully!", result));
    } catch (error) {
        const message = error.code === 11000 
            ? "Feed name and tank name combination must be unique"
            : "Feed name and tank name are required fields";
        
        res.status(error.status || 500).json(errorResponse(error.status || 500, message));
    }
});

module.exports = router;