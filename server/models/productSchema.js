const mongoose = require("mongoose");

const productModel = new mongoose.Schema(
    {
        name: { type: String, required: true },
        cost: { type: Number, required: true },
        category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
        subcategory: {
            type: mongoose.Schema.ObjectId,
            ref: "Categories",
        },
        description: { type: String, required: true },
        rating: { type: Number },
        producer: { type: String },
        stock: { type: Number },
        material: { type: String },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Products", productModel);
