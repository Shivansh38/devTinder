const mongoose = require('mongoose');

const connectDB = async () =>{
   await mongoose.connect(
    "mongodb+srv://Shivansh:yOTaH4WKpTBV2xBU@shivansh.xwcvf.mongodb.net/devTinder"
    );
}

module.exports = connectDB;
