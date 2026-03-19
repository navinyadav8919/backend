const errorHandler=(error,req,res,next)=>{
    console.log(error.stack);
    res.status(500).json({message:"Internal server error",error:error.message})
}

module.exports=errorHandler;