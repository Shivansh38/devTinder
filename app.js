const express = require('express');
const connectDB = require("./config/database"); 
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {  
    const userName = req.body;
    
    try {
        const user = new User(userName);
        await user.save(); 
        res.send("🎉 Data added successfully!");
    } catch (error) {
        res.status(500).json({ message: "❌ Error saving data", error });
    }
});

app.get("/feed", async (req, res) => {
    
    const userName = req.body.firstName  
    try {
        const user = await User.find({ firstName: userName });
        res.json(user);
    } catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err });
    }
});


app.delete("/user", async (req,res) =>{
    const userId = req.body.userId;
    try{
        const user = await User.findByIdAndDelete(userId);
        res.send("User deleted sucessfully");
    }
    catch (err) {
        res.status(400).json({ message: "❌ Something went wrong", error: err });
    }


})
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
