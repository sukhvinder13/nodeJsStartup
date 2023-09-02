const express = require("express");
const router = express.Router();
const conversations = require("../models/conversations");
const Users = require("../models/login");


router.post("/getAllConversations", (req, res, next) => {
    console.log('created by',req.body.createdBy)
    // return;
    conversations.find({to :req.body.createdBy}).then(documents => {
        res.status(200).json({
            message: "Conversations fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getUsersInfo", (req, res, next) => {
    Users.find().select('email role name').then(documents => {
        // let obj={email:documents.email,id:documents.id}
        res.status(200).json({
            message: "Users fetched successfully!",
            posts: documents
        });
    });
});
router.post("/saveConversation", (req, res, next) => {
    const addCustomer = conversations({
        name:  req.body.name,
        email:  req.body.email,
        sent:  req.body.sent,
        message:  req.body.message,
        received:  req.body.received,
        from: req.body.from,
        to:  req.body.to,
        createdBy:  req.body.createdBy,
        updatedBy:  req.body.updatedBy,
        createdOn:new Date()
    })
    addCustomer.save((err, result) => {
        if (err) {
            res.send({
                status: 500,
                success: false,
                message: 'Internal Server error occured while saving farm',
                err: err
            });
        } else {
            res.send({
                status: 200,
                success: true,
                message: 'Success',
                result: result
            });
        }

    })
});
module.exports = router; 
