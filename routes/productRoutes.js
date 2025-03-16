const express = require("express");
const router = express.Router();

const {getAllProducts, createProduct, removeProduct} = require("../controllers/productController");

router.get("/", getAllProducts); 
// router.get("/:id", selectProduct);
router.post("/", createProduct);
router.delete("/:id", removeProduct);

module.exports = router;



