const express = require("express");
const router = express.Router();
const stories = require("../models/stories");
const Users = require("../models/login");


router.post("/getAllConversations", (req, res, next) => {
    // console.log('created by',req.body.createdBy)
    // return;
    stories.find({'to' :req.body.createdBy}).then(documents => {
        res.status(200).json({
            message: "Conversations fetched successfully!",
            posts: documents
        });
    });
});
router.get("/getStories", (req, res, next) => {
    stories.find().then(documents => {
        // let obj={email:documents.email,id:documents.id}
        res.status(200).json({
            message: "Users fetched successfully!",
            posts: documents
        });
    });
});
router.post("/saveStories", (req, res, next) => {
    const addCustomer = stories({
        name:  req.body.name,
        email:  req.body.email,
        story:  req.body.story,
        createdBy:  req.body.createdBy,
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
