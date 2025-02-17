const express = require('express');
const requestRouter = express.Router();
const userAuth = require('../Middlewares/auth');

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res) =>{
    const user = req.user;

    res.send(user.firstName + "send this request");
})

module.exports = requestRouter;