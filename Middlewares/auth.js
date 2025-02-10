const adminAuth = (req,res,next) =>{
    console.log("auth is getting checked");
    const token = "xyz1";
    isAdminauthorized = token === "xyz";
    if(!isAdminauthorized){
        res.send("OOPS you ar not authorized");
    }
    next();
}
module.exports = adminAuth