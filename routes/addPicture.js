const express = require("express");
const router = express.Router();
const AddPicture = require("../models/addPicture");
const multer = require("multer");
const path = require("path");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const pictureService = new CRUDService(AddPicture);

const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploadedImages/pondpreparation/");
        },
        filename: (req, file, cb) => {
            const randomNo = Math.floor(Math.random() * 90000) + 10000;
            req.body.conditionFilePath = `${randomNo}_pondpreparation${path.extname(file.originalname)}`;
            cb(null, `${randomNo}pondpreparation${path.extname(file.originalname)}`);
        }
    })
});

router.post('/addPicture', upload.single('file'), async (req, res, next) => {
    try {
        const pictureData = {
            farmId: req.body.farmId,
            tankId: req.body.tankId,
            pictureFilePath: req.body.conditionFilePath
        };

        const result = await pictureService.create(pictureData);
        res.status(200).json(successResponse(200, "Picture saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
