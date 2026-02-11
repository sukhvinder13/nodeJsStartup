const express = require("express");
const router = express.Router();
const Users = require("../models/login");
const jwt = require("jsonwebtoken");
const { successResponse, errorResponse } = require("../utils/responseHandler");
require('dotenv').config();

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email) {
            return res.status(400).json(errorResponse(400, "Email is required"));
        }

        const user = await Users.findOne({ email }).lean().exec();
        
        if (!user) {
            return res.status(401).json(errorResponse(401, "Auth failed: email not found"));
        }

        const jwtToken = jwt.sign(
            {
                email: user.email,
                _id: user._id,
                name: user.name,
                role: user.role
            },
            process.env.JWT_SECRET || 'longer-secret-is-better',
            { expiresIn: '10m' }
        );

        res.status(200).json(successResponse(200, "Auth successful", {
            isAuth: true,
            jwtToken,
            user: {
                email: user.email,
                name: user.name,
                role: user.role,
                _id: user._id
            }
        }));
    } catch (err) {
        res.status(500).json(errorResponse(500, "Internal server error", err.message));
    }
});

module.exports = router;
