import pool from '../config/conexionDB.js';

class UserModel {

    static async selectUsers() {
        const result = await pool.query(
            "SELECT * FROM users"
        );
        console.log(result)
        return result.rows;
    }

    static async insertUser({username, name, password}) {
        const result = await pool.query(
            "INSERT INTO users (username, name, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [username, name, password]
        );
        return result.rows;
    }

    static async updateUser(id, {username, name, password}) {
        const result = await pool.query(
            `UPDATE users 
                SET
                    username = $1,
                    name = $2,
                    password = $3
                WHERE id = $4
                RETURNING *`,
            [username, name, password, id]
        );
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

    static async getUserById(id) {
        const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        return result.rows[0];
      }

    static async getUserByUsername(username) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
    }
    
    static async deleteUser(id) {
        const result = await pool.query("DELETE FROM users WHERE id = $1 RETURNING *", [id]);
        return result.rows[0];
      }
}

export default UserModel;