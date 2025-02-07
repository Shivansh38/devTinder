const express = require('express');
const auth = require("./Middlewares/auth");
const app = express();
 
app.get("/admin/user", auth, (req,res) =>{
    res.send("all details fetched");
})

app.listen(3000, ()=>{
    console.log("Server is sucessfully listening on 3000");
});