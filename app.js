const express = require('express');
const connectDB = require("./config/database"); 
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());

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

// Feed Route (GET user by firstName)
app.get("/feed", async (req, res) => {
    const userName = req.query.firstName; // Use query parameters instead of req.body

    if (!userName) {
        return res.status(400).json({ message: "❌ firstName query parameter is required" });
    }

    try {
        const users = await User.find({ firstName: userName });
        res.json(users);
    } catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
    }
});

// Delete User Route
app.delete("/user/:userId", async (req, res) => { // Use URL params instead of req.body
    const userId = req.params.userId;

    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: "❌ User not found" });
        }
        res.json({ message: "✅ User deleted successfully", user });
    } catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
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
            return res.status(200).json({ message: "✅ Login Successful Yayy!!" }); // ✅ Return after sending response
        } else {
            throw new Error("❌ Invalid password, please try again.");
        }
    } catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err.message });
    }
});




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
