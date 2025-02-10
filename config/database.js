const mongoose = require('mongoose');

const connectDB = async () =>{
   await mongoose.connect(
    "mongodb+srv://Shivansh:yOTaH4WKpTBV2xBU@shivansh.xwcvf.mongodb.net/"
    );
}

connectDB().then(()=>{
    console.log("Database sucessfully connected");
}).catch(err=>{
    console.error("Database connection failed !!");
});
