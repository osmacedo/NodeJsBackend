import express from 'express';

import productRoutes from './routes/productRoutes.js';

import categoryRoutes from './routes/categoryRoutes.js';

import authRoutes from './routes/authRoutes.js';

import userRoutes from './routes/userRoutes.js';

import { swaggerDocs } from "../swagger.js";

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

app.use("/categories", categoryRoutes);

app.use("/auth", authRoutes);

app.use("/users", userRoutes);

// app.use((req, res) => {
//     res.status(404).send(`
//         <!DOCTYPE html>
//         <html lang="es">
//         <head>
//             <meta charset="UTF-8">
//             <meta name="viewport" content="width=device-width, initial-scale=1.0">
//             <title>404 - Página no encontrada</title>
//             <style>
//                 body {
//                     font-family: Arial, sans-serif;
//                     text-align: center;
//                     padding: 50px;
//                     background-color:rgb(59, 79, 90);
//                 }
//                 h1 {
//                     font-size: 48px;
//                     color: #333;
//                 }
//                 p {
//                     font-size: 18px;
//                     color: #666;
//                 }
//                 a {
//                     text-decoration: none;
//                     color:rgb(185, 142, 23);
//                     font-size: 20px;
//                 }
//                 a:hover {
//                     text-decoration: underline;
//                 }
//             </style>
//         </head>
//         <body>
//             <h1>404</h1>
//             <p>Lo sentimos, la página que buscas no existe.</p>
//             <a href="/">Volver al inicio</a>
//         </body>
//         </html>
//     `);
// });

swaggerDocs(app, 3000);

app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    console.error(err.stack); // 🔥 Imprime el error completo en desarrollo

    res.status(err.status || 500).json({
        error: err.message || "Error interno del servidor",
    });
});

export default app;


