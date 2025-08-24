import ProductModel from '../models/productModel.js';
import ProductService from '../service/ProductService.js';

class ProductController {
    static async getAllProducts (req,res,next) {
        try {
            const selectedProducts = await ProductModel.selectProducts()
            res.status(200).json(selectedProducts)
        } catch (error) {
            next(error);
        }
    }

    static async getAllProductsByCategory (req,res,next) {
        try {
            const {id} = req.params;

            if (isNaN(id)) {
                return res.status(400).json({"error":"id invalido"});    
            }

            const selectedProductsByCategories = await ProductModel.selectProductsByCategory(id)   

            if (!selectedProductsByCategories) {
                return res.status(404).json({"error":"Productos no encontrados en la categoria"});    
            }
            res.status(200).json(selectedProductsByCategories)
        } catch (error) {
            next(error);
        }
    }

    static async createProduct (req,res,next) {
        
        const productData = req.body
        const {name, description, sku} = productData
        if (!name || !description || !sku) {
            return res.status(400).json({"error":"faltan datos"})
        }

        try {
            const createdProduct = await ProductService.createProductWithCategories(productData)
            res.status(201).json(createdProduct)
        } catch (error) {
            next(error);
        }
    }

    static async updateProduct (req,res,next) {
        
        const {id} = req.params;
        const productData = req.body;
        const {name, description} = productData;

        if (!name || !description) {
            return res.status(400).json({"error":"faltan datos"})
        }

        if (isNaN(id)) {
            return res.status(400).json({"error":"id invalido"});    
        }

        try {
            const updatedProduct = await ProductModel.updateProduct(id, productData);

            if (!updatedProduct) {
                return res.status(404).json({"error":"Producto no encontrado"})
            }

            res.status(200).json(updatedProduct)
        } catch (error) {
            next(error);
        }
    }

    static async getProductById (req,res,next) {
        try {
            const {id} = req.params;

            if (isNaN(id)) {
                return res.status(400).json({"error":"id invalido"});    
            }

            const selectedProduct = await ProductModel.selectProduct(id)   

            if (!selectedProduct) {
                return res.status(404).json({"error":"Producto no encontrado"});    
            }
            res.status(200).json(selectedProduct)
        } catch (error) {
            next(error);
        }
    }

    static async removeProduct (req,res) {

        try {    
            const {id} = req.params;

            if (isNaN(id)) {
                return res.status(400).json({"error":"id invalido"});    
            }
        
            const deletedProduct = await ProductModel.deleteProduct(id);
        
            if (!deletedProduct) {
                return res.status(404).json({"error":"Producto no encontrado"});    
            }
            res.status(200).json({message:"producto eliminado ", deletedProduct});
            
        } catch (error) {
            console.error("error al actualizar productos", error);
            res.status(500).json({error:error});
        }
    }
}

export default ProductController;
