const express = require("express");
const router = express.Router();
const apiDetails = require("../apiDetails");
const CultivationModel = require("../models/Cultivation");
const multer = require("multer");
const path = require("path");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const cultivationService = new CRUDService(CultivationModel);

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploadedImages/cultivations/");
        },
        filename: (req, file, cb) => {
            const randomNo = Math.floor(Math.random() * 90000) + 10000;
            req.body.conditionFilePath = `${randomNo}_cultivation${path.extname(file.originalname)}`;
            cb(null, `${randomNo}cultivation${path.extname(file.originalname)}`);
        }
    })
});

router.post(apiDetails.cultivation.saveWithImage.api_url, upload.single("file"), async (req, res) => {
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