const express = require("express");
const router = express.Router();
const stories = require("../models/stories");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const storyService = new CRUDService(stories);

router.post("/getAllConversations", async (req, res, next) => {
    try {
        const documents = await storyService.find({ to: req.body.createdBy });
        res.status(200).json(successResponse(200, "Stories fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.get("/getStories", async (req, res, next) => {
    try {
        const documents = await storyService.getAll();
        res.status(200).json(successResponse(200, "Stories fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post("/saveStories", async (req, res, next) => {
    try {
        const storyData = {
            name: req.body.name,
            email: req.body.email,
            story: req.body.story,
            createdBy: req.body.createdBy,
            createdOn: new Date()
        };

        const result = await storyService.create(storyData);
        res.status(200).json(successResponse(200, "Story saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
