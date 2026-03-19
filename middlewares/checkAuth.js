const checkAuth=(req,res,next)=>{
    const token=req.headers["authorization"];

    if(token=="bearer mysecrettoken")
    {
        next();
    }
    else{
        res.status(401).json({message:"unauthorized user"})
    }
};

module.exports=checkAuth;