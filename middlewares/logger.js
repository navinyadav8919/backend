const logger=(req,res,next)=>{
    console.log(`${new Date().toISOString()} 111111111 ${req.method} 111 ${req.url}`);
    next();
}
module.exports=logger;