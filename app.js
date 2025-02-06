const express = require('express');

const app = express();
 
app.use("/test",(req,res) =>{
    res.send("Hello from the lala!");
})

app.listen(3000, ()=>{
    console.log("Server is sucessfully listening on 3000");
});