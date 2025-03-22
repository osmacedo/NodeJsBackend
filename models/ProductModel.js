import pool from '../config/conexionDB.js';
console.log(pool);

const productModel = {  
    selectProducts:async() => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
    },
    insertProduct:async(name, description) => {
    const result = await pool.query(
        "INSERT INTO products(name, description)	VALUES ($1, $2) RETURNING *", [name, description])
        return result.rows[0];

    },
    deleteProduct:async(id) => {
        const result = await pool.query(
            "DELETE FROM products WHERE ID = $1 RETURNING *", [id])
        return result.rows[0];
        }
};

export default productModel;
