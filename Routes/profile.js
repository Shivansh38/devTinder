const express = require('express');
const profileRouter = express.Router();
const userAuth = require('../Middlewares/auth');

profileRouter.get("/profile", userAuth, async(req,res) =>{
    try{
    const user = req.user;
    return res.send(user);
    }
    catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
    }
})

module.exports = profileRouter;