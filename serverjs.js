const express = require("express");

const pool = require("./conexionDB.js");

console.log(pool);

const app = express();

app.use(express.json()); 

app.get("/",(req,res) => {
    res.send("inicio")
})

app.get("/home",(req,res) => {
    res.send("home")
})

app.get("/products", async (req,res) => {
    try {
        const result = await pool.query("SELECT * FROM products")
        res.status(200).json(result.rows)
    } catch (error) {
        console.error("error al obtener productos", error)
        res.status(500).json({"error":error})
    }
})

app.post("/products", async (req,res) => {
    
    const {name, description} = req.body
    if (!name || !description) {
        return res.status(400).json({"error":"faltan datos"})
    }

    try {
        const result = await pool.query(
            "INSERT INTO public.products(name, description)	VALUES ($1, $2) RETURNING *", [name, description])
        res.status(201).json(result.rows[0])
    } catch (error) {
        console.error("error al actualizar productos", error)
        res.status(500).json({"error":error})
    }
})

app.listen(3000,() => {
    console.log("servidor escuchando http://localhost:3000")
})

