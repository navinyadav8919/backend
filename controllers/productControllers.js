const {products} = require("../data/product");

const getAllProducts = (req, res) => {
    res.json(products);
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
};

const createProduct = (req, res) => {
    const { id, name, price } = req.body;

    const existing = products.find(p => p.id === id);

    if (existing) {
        return res.status(400).json({ message: "Product with this id already exists" });
    }

    const newProduct = { id, name, price };
    products.push(newProduct);

    res.status(201).json({message:"new product is created",Data:newProduct});
};

const updateProduct = (req, res) => {
    const id = parseInt(req.params.id);
    const { name, price } = req.body;

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({ message: "Product not found" });
    }

    if (name) product.name = name;
    if (price) product.price = price;

    res.json(product);
};

const deleteProduct = (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Product not found" });
    }

    const deletedProduct = products.splice(index, 1);

    res.json(deletedProduct[0]);
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};