import pool from '../config/conexionDB.js';
// console.log(pool);

class ProductModel {  
    static async selectProducts() {
        const result = await pool.query("SELECT * FROM products");
        return result.rows;
    }

    static async selectProductsByCategory(id) {
        const result = await pool.query("SELECT p.* FROM products p JOIN categories_x_products c_p ON p.id = c_p.product_id WHERE c_p.category_id = $1", [id]);
        return result.rows;
    }

    static async selectProduct(id) {
        const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async insertProduct({name, description, price, stock, sku, is_active}) {
        const result = await pool.query(`
            INSERT INTO products(name, description, price, stock, sku, is_active)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *`
            , [name, description, price, stock, sku, is_active])
        return result.rows[0];

    }
    static async updateProduct(id, {name, description, price, stock, sku, is_active}) {
        const result = await pool.query(
            `UPDATE products
                SET
                    name = $1,
                    description = $2,
                    price = $3,
                    stock = $4,
                    sku = $5,
                    is_active = $6,
                    updated_at = NOW()
                WHERE id = $7
                RETURNING *`, [name, description, price, stock, sku, is_active, id]);
        return result.rows[0];
    }

    static async deleteProduct(id) {
        const result = await pool.query(
            "DELETE FROM products WHERE id = $1 RETURNING *", [id])
        return result.rows[0];
        }

    static async assignCategoryToProduct(productId, categoryId, client){
        const query = `
        INSERT INTO categories_x_products (product_id, category_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING;
        `;
      await client.query(query, [productId, categoryId]);
    }    
};

export default ProductModel;
