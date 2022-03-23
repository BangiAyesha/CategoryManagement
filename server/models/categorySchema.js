const mongoose = require("mongoose");

const categoryModel = new mongoose.Schema(
    {
        categoryName: { type: String, required: true },
        subcategory: [{ name: { type: String, required: true } }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Categories", categoryModel);
