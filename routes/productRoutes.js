const express=require("express");

const {getAllProducts,getProductById,createProduct,updateProduct,deleteProduct}=require("../controllers/productControllers");
const checkAuth = require("../middlewares/checkAuth");
const validateProduct = require("../middlewares/validateProducts");

const router=express.Router();

router.get("/",checkAuth,getAllProducts);
router.get("/:id",checkAuth,getProductById);
router.post("/",validateProduct,createProduct);
router.put("/:id",validateProduct,updateProduct);
router.delete("/:id",deleteProduct);

module.exports=router;
