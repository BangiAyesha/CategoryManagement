const express = require("express");
const router = express.Router();
const {
    addCategory,
    getCategory,
    deleteSubcategory,
    deleteCategory,
    editSubcategory,
    editCategory,
} = require("../controller/categoryController");

router.post("/addcategory", addCategory);

router.get("/getcategory", getCategory);

router.put("/deletesubcategory", deleteSubcategory);

router.delete("/deletecategory/:id", deleteCategory);

router.put("/editsubcategory", editSubcategory);

router.put("/editcategory", editCategory);

module.exports = router;
