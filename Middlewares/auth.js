const adminAuth = (req,res,next) =>{
    console.log("auth is getting checked");
    const token = "asda";
    isAdminauthorized = token === "xyz";
    if(!isAdminauthorized){
        res.send("OOPS you ar not authorized");
    }
    next();
}
module.exports = adminAuth