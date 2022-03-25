const express = require("express");
const {
    addProduct,
    getProducts,
    deleteProduct,
} = require("../controller/productController");
const router = express.Router();

router.post("/product/addproduct", addProduct);

router.get("/product/getproducts", getProducts);

router.delete("/product/deleteproduct/:id", deleteProduct);

module.exports = router;
