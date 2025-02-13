const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    photoUrl: {
        type:String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnAniVaQ-69zi0yMjUl5SAZOaiw_ffLqypg&s",
    },
    about: {
        type:String,
        default: "This is default about"
    },
    skills: {
        type:[String],
    },


},
{
    timestamps: true,
})



module.exports = mongoose.model("User",userSchema);