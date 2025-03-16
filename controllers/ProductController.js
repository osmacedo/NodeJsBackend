const productModel = require("../models/ProductModel");

const getAllProducts = async (req,res,next) => {
    try {
        const selectedProducts = await productModel.selectProducts() //pool.query("SELECT * FROM products")
        res.status(200).json(selectedProducts)
    } catch (error) {
        next(error);
    }
}

const createProduct = async (req,res,next) => {
    
    const {name, description} = req.body
    if (!name || !description) {
        return res.status(400).json({"error":"faltan datos"})
    }

    try {
        const createdProduct = await productModel.insertProduct(name, description)
        res.status(201).json(createdProduct[0])
    } catch (error) {
        next(error);
    }
}

const removeProduct = async (req,res) => {

    try {    
        const {id} = req.params;

        if (isNaN(id)) {
            return res.status(400).json({error:"id invalido"});    
        }
    
        const deletedProduct = await productModel.deleteProduct(id);
    
        if (!deletedProduct) {
            return res.status(404).json({error:"Producto no encontrado"});    
        }
        res.status(200).json({message:"producto eliminado ", deletedProduct});
        
    } catch (error) {
        console.error("error al actualizar productos", error);
        res.status(500).json({error:error});
    }
}

module.exports = {getAllProducts, createProduct, removeProduct}; 