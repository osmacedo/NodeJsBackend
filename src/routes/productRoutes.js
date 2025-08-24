import express from 'express';
const router = express.Router();

import ProductController from '../controllers/productController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

router.get("/", ProductController.getAllProducts); 
// router.get("/", authMiddleware, ProductController.getAllProducts); para permisos de usuario
router.get("/categories/:id", ProductController.getAllProductsByCategory);
// router.get("/categories/", ProductController.getAllProductsByAllCategories);http://localhost:3000/products/categories/
router.get("/:id", ProductController.getProductById);


/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crea un nuevo producto
 *     tags: [Productos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - sku
 *             properties:
 *               name:
 *                 type: string
 *                 example: Juan Pérez
 *               description:
 *                 type: string
 *                 example: descripcion
 *               price:
 *                 type: double
 *                 example: 5000.00
 *               stock:
 *                 type: integer
 *                 example: 4
 *               sku:
 *                 type: string
 *                 example: ASDF234457568
 *               is_active:
 *                 type: boolean
 *                 example: true
 *               categories:
 *                 type: array
 *                 items:
 *                   type: integer
 *                 example: [1,2]        
 *     responses:
 *       201:
 *         description: Producto creado exitosamente
 */
router.post("/", ProductController.createProduct);


router.put("/:id", ProductController.updateProduct);
router.delete("/:id", ProductController.removeProduct);


export default router;



