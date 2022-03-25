const Products = require("../models/productSchema");

const addProduct = function (req, res) {
    let ins = new Products(req.body);
    ins.save((err) => {
        if (err) {
            res.send({ flag: 0, message: err.message });
        } else {
            res.send({ flag: 1, message: "Product Added" });
        }
    });
};

const getProducts = function (req, res) {
    Products.find()
        .populate("category")
        // .populate("category.subcategory.name")
        // .populate({
        //     path: "subcategory",
        //     model: "Categories",
        // })
        .exec((err, data) => {
            if (err) {
                res.send({ flag: 0, message: err.message });
            } else {
                res.send(data);
            }
        });
};

const deleteProduct = function (req, res) {
    console.log(req.params);
    Products.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send({ flag: 0, message: err.message });
        } else {
            res.send({ flag: 1, message: "Product deleted!!" });
        }
    });
};

module.exports = { addProduct, getProducts, deleteProduct };
