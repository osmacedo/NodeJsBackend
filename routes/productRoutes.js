import express from 'express';
const router = express.Router();

import {getAllProducts, createProduct, removeProduct} from '../controllers/productController.js';

router.get("/", getAllProducts); 
// router.get("/:id", selectProduct);
router.post("/", createProduct);
router.delete("/:id", removeProduct);

export default router;



