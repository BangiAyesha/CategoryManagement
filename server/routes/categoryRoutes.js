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

router.post("/category/addcategory", addCategory);

router.get("/category/getcategory", getCategory);

router.put("/category/deletesubcategory", deleteSubcategory);

router.delete("/category/deletecategory/:id", deleteCategory);

router.put("/category/editsubcategory", editSubcategory);

router.put("/category/editcategory", editCategory);

module.exports = router;
