const express = require('express');
const connectDB = require("./config/database"); 
const cookieParser = require('cookie-parser')
const app = express();

const authRouter = require("./Routes/auth");
const profileRouter = require('./Routes/profile');
const requestRouter = require('./Routes/requests');


app.use(express.json());
app.use(cookieParser());

const jwt = require('jsonwebtoken');


app.use("/",authRouter);
app.use("/",profileRouter);
app.use("/",requestRouter);

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
