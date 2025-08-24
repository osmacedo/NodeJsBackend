import pool from "../config/conexionDB.js"
import CategoryModel from "../models/categoryModel.js";
import ProductModel from "../models/productModel.js";

class ProductService {
    static async createProductWithCategories({
        name,
        description,
        price,
        stock,
        sku,
        is_active = true,
        categories = []
    }) {
        const client = await pool.connect();
        try {
            await client.query('BEGIN');

            const product = await ProductModel.insertProduct(
                { name, description, price, stock, sku, is_active},
                client // pasamos al cliente para usar la misma transaccion
            );

            for (const categoryId of categories) {
                console.log(categoryId)
                const category = await CategoryModel.selectCategory(categoryId, client);
                console.log(category)
                if (!category) {
                    throw new Error(`La categoria con ID ${categoryId} no existe`);
                }

                await ProductModel.assignCategoryToProduct(product.id, categoryId, client);
            }

            await client.query('COMMIT');
            return product;
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
                     
        } finally {
            client.release();
        } 
    }
}

export default ProductService;