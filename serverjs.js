const express = require("express");

const productRoutes = require("./routes/productRoutes.js");

const app = express();

app.use(express.json()); 
app.use(express.urlencoded({extended:true}))

app.get("/",(req,res) => {
    res.send("inicio")
})

app.get("/home",(req,res) => {
    res.send("home")
})

app.use("/products", productRoutes);

app.use((req,res) => {
    res.status(404).send("404 not found aaa");
})

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    console.error(err.stack); // 🔥 Imprime el error completo en desarrollo

    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor",
    });
});

app.listen(3000,() => {
    console.log("servidor escuchando http://localhost:3000")
})

