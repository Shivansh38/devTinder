const express = require('express');
const connectDB = require("./config/database"); 
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser')
const app = express();
app.use(express.json());
app.use(cookieParser());

const jwt = require('jsonwebtoken');

const userAuth = require('./Middlewares/auth');

// Signup Route
app.post("/signup", async (req, res) => {  
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


//login api
app.post("/login", async (req, res) => {
    try {
        const { emailId, password } = req.body;
        console.log(emailId);
        console.log(password);

        const user = await User.findOne({ emailId });
        if (!user) {
            throw new Error("User not registered");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (isPasswordValid) {
            // create jwt token
            const token = await jwt.sign({_id : user._id }, "Devtinder@123", {
                expiresIn: "1d"
            });
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


app.get("/profile", userAuth, async(req,res) =>{
    try{
    const user = req.user;
    return res.send(user);
    }
    catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
    }
})

app.post("/sendConnectionRequest", userAuth, async(req,res) =>{
    const user = req.user;

    res.send(user.firstName + "send this request");
})
// Connect to Database and Start Server
connectDB()
    .then(() => {
        console.log("✅ Database successfully connected");
        app.listen(3000, () => {
            console.log("🚀 Server is running on port 3000");
        });
    })
    .catch((err) => {
        console.error("❌ Database connection failed !!", err);
    });
