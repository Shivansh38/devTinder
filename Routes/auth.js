const express = require('express');
const { validateSignupData } = require("../utils/validation");
const authRouter = express.Router();
const User = require("../models/user");
const bcrypt = require('bcrypt');

authRouter.post("/signup", async (req, res) => {  
    try {
        validateSignupData(req);  // Validate request body  
        // extract the password
        const {firstName, lastName, emailId, password,age,gender} = req.body;

        // create encrypted password
        const passwordHash = await bcrypt.hash(password,10)
        
        const user = new User({
            firstName,lastName,emailId,password:passwordHash,gender,age
        });
        await user.save(); 
        
        res.status(201).json({ message: "🎉 User added successfully!" });
    } catch (err) {
        res.status(500).json({ message: `❌ Error saving data: ${err.message}` });
    }
});
// login api
authRouter.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("User not registered");
        }
        const isPasswordValid = await user.validatePassword(password);

        if (isPasswordValid) {
            const token = await user.getJWT();
            console.log(token);
            res.cookie("token", token);
            return res.status(200).json({ message: "✅ Login Successful Yayy!!" }); // ✅ Return after sending response
        } else {
            throw new Error("❌ Invalid password, please try again.");
        }
    } catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
    }
});
authRouter.post("/logout", async(req,res) =>{
    res.cookie("token",null, {
        expires: new Date(Date.now()),
    });
    res.send("User logged Out Sucessfully");
})



module.exports = authRouter