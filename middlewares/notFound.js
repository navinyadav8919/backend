const notFound=(req,res)=>{
    res.status(404).json({message:"route not found or wrong route"});
};

module.exports=notFound;