const express = require('express');
const connectDB = require("./config/database"); 
const User = require("./models/user");

const app = express();


app.post("/signup", async (req, res) => {  
    try {
        const user = new User({ 
            firstName: "Hala",
            lastName: "dev",
            age: 32
        });

        await user.save(); 
        res.send("🎉 Data added successfully!");
    } catch (error) {
        res.status(500).json({ message: "❌ Error saving data", error });
    }
});


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
