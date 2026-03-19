const express=require("express");

const port=3001;

const productRoutes=require('./routes/productRoutes');

const app=express();
app.use(express.json());


const logger=(req,res,next)=>{
    console.log(`${new Date()} ${req.method} ${req.url}`);

    next();
};

const logger2=(req,res,next)=>{
    console.log(`${new Date()} 1111111111b ${req.method} ${req.url}`);

    next();
};

app.use(logger);
app.use(logger2);

app.get("/",(req,res)=>{
    res.send("first application");
})

app.use("/products",productRoutes);

app.listen(port,()=>{
    console.log(`server is running on the http://localhost:${port}`);
});
