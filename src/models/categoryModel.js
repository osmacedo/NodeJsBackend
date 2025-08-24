import pool from '../config/conexionDB.js';
// console.log(pool);

class CategoryModel {  
    static async selectCategories() {
        const result = await pool.query("SELECT * FROM categories");
        return result.rows;
    }

    static async selectCategory(id) {
        const result = await pool.query("SELECT * FROM categories WHERE id = $1", [id]);
        return result.rows[0];
    }

    static async insertCategory({name}) {
        const result = await pool.query(`
            INSERT INTO categories(name)
            VALUES ($1)
            RETURNING *`
            , [name])
        // console.log(result);
        return result.rows[0];

    }

    static async updateCategory(id, name) {
        const result = await pool.query(
            "UPDATE categories SET name = $2 WHERE id = $1 RETURNING *", [id, name])
        return result.rows[0];
    }

    static async deleteCategory(id) {
        const result = await pool.query(
            "DELETE FROM categories WHERE id = $1 RETURNING *", [id])
        return result.rows[0];
        }
};

export default CategoryModel;
