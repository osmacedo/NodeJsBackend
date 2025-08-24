import express from 'express';
const router = express.Router();

import UserController from '../controllers/userController.js';
// import { authMiddleware } from '../middleware/authMiddleware.js';


/**
 * @swagger
 * /users:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */
router.get("/", UserController.getAllUsers); 


router.get("/:id", UserController.getUserById);
router.get("/username/:id", UserController.getUserByUsername);
router.post("/", UserController.createUser);
router.put("/:id", UserController.updateUser);
router.delete("/:id", UserController.deleteUser);

export default router;
