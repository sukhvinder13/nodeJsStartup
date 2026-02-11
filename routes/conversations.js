const express = require("express");
const router = express.Router();
const conversations = require("../models/conversations");
const Users = require("../models/login");
const CRUDService = require("../services/crudService");
const { successResponse, errorResponse } = require("../utils/responseHandler");

const conversationService = new CRUDService(conversations);
const userService = new CRUDService(Users);

router.post("/getAllConversations", async (req, res, next) => {
    try {
        const documents = await conversationService.find({ to: req.body.createdBy });
        res.status(200).json(successResponse(200, "Conversations fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.get("/getUsersInfo", async (req, res, next) => {
    try {
        const documents = await Users.find().select('email role name').lean().exec();
        res.status(200).json(successResponse(200, "Users fetched successfully!", documents));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

router.post("/saveConversation", async (req, res, next) => {
    try {
        const conversationData = {
            name: req.body.name,
            email: req.body.email,
            sent: req.body.sent,
            message: req.body.message,
            received: req.body.received,
            from: req.body.from,
            to: req.body.to,
            createdBy: req.body.createdBy,
            updatedBy: req.body.updatedBy,
            createdOn: new Date()
        };

        const result = await conversationService.create(conversationData);
        res.status(200).json(successResponse(200, "Conversation saved successfully!", result));
    } catch (error) {
        res.status(error.status || 500).json(errorResponse(error.status || 500, error.message));
    }
});

module.exports = router; 
