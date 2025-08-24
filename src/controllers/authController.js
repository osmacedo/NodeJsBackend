import pool from '../config/conexionDB.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/jwt.js';
// import {validarUsername, validarPassword} from '../validators/authValidators.js';
import UserModel from '../models/userModel.js';


export const register = async (req, res) => {

    const {username, name, password} = req.body

    if (!username || !password) {
        return res.status(400).json({"error": "Usuario y contrasena son obligatorios"})
    }

    if (!validarUsername(username)) {
        return res.status(400).json({"error": "Usuario debe tener entre 6 y 60 caracteres y solo puede contener letras, numeros y guiones."})
    }

    if (!validarPassword(password)) {
        return res.status(400).json({"error": "Contrasena debe contener almenos una letra mayuscula y un caracter especial"})
    }

    try {
        // preferiblemente utilizar auth model
        const userExists =  await UserModel.getUserByUsername(username);
        // const userExists =  await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (userExists.rows.length > 0 ) {
            return res.status(400).json({"error": "Usuario ya existe"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await pool.query(
            "INSERT INTO users (username, name, password, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
            [username, name, hashedPassword]
        );

        res.json({"message": "Usuario registrado correctamente", user: newUser.rows[0]})

    } catch (error) {
        console.error(error);
        res.status(500).json({"error": "Error en el servidor"});        
    }

}

export const login = async (req, res) => {
    const {username, password} = req.body

    try {
        
        const findUser = await pool.query(
            "SELECT * FROM users WHERE username = $1", [username]
        );
        
        const user = findUser.rows[0];
        // console.log(user)

        const hashedPassword = user.password;
        console.log(hashedPassword);

        const passwordMatch = await bcrypt.compare(password, hashedPassword);
        console.log(passwordMatch);
        
        if (!passwordMatch) {
            return res.status(401).json({"message": "Contrasena incorrecta"})
        }
        console.log(user)

        const token = generateToken(user.id, user.username);
        
        res.json({
            message: "Inicio de sesión exitoso"
            ,
            token,
            user: {
              id: user.id,
              username: user.username
            }
          });
        
    } catch (error) {
        res.status(500).json({"error": "Error en el servidor"});
    }
}


