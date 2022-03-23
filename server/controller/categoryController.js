const Categories = require("../models/categorySchema");

const addCategory = function (req, res) {
    Categories.findOne(
        { categoryName: req.body.values.category },
        (err, data) => {
            if (data) {
                Categories.findOne(
                    { "subcategory.name": req.body.data.subcategory },
                    (err, data) => {
                        if (data) {
                            res.send({
                                flag: 0,
                                message: "Sub-category exists!!!",
                            });
                        } else {
                            Categories.findOneAndUpdate(
                                { categoryName: req.body.values.category },
                                {
                                    $push: {
                                        subcategory: {
                                            name: req.body.data.subcategory,
                                        },
                                    },
                                },
                                (err) => {
                                    if (err) {
                                        res.send({
                                            flag: 0,
                                            message: err.message,
                                        });
                                    } else {
                                        res.send({
                                            flag: 1,
                                            message: "Category Added",
                                        });
                                    }
                                }
                            );
                        }
                    }
                );
            } else {
                let data = {
                    categoryName: req.body.values.category,
                    subcategory: {
                        name: req.body.data.subcategory,
                    },
                };
                let ins = new Categories(data);
                ins.save((err) => {
                    if (err) {
                        res.send({ flag: 0, message: err.message });
                    } else {
                        res.send({ flag: 1, message: "Category Added" });
                    }
                });
            }
        }
    );
};

const getCategory = function (req, res) {
    Categories.find({}, (err, data) => {
        if (err) {
            res.send({ flag: 0, message: err.message });
        } else {
            res.send(data);
        }
    });
};

const deleteSubcategory = function (req, res) {
    Categories.updateOne(
        { "subcategory._id": req.body.id },
        { $pull: { subcategory: { _id: req.body.id } } },
        (err, data) => {
            if (err) {
                res.send({ flag: 0, message: err.message });
            } else {
                res.send({ flag: 1, message: "Sub-category deleted!!" });
            }
        }
    );
};

const deleteCategory = function (req, res) {
    Categories.deleteOne({ _id: req.params.id }, (err) => {
        if (err) {
            res.send({ flag: 0, message: err.message });
        } else {
            res.send({ flag: 1, message: "Category deleted!!" });
        }
    });
};

const editSubcategory = function (req, res) {
    Categories.updateOne(
        { "subcategory._id": req.body.id },
        { $set: { "subcategory.$.name": req.body.subcategory } },
        (err) => {
            if (err) {
                res.send({ flag: 0, message: err.message });
            } else {
                res.send({
                    flag: 1,
                    message: "Sub-category changed..!!",
                });
            }
        }
    );
};

const editCategory = function (req, res) {
    console.log(req.body);
    Categories.updateOne(
        { _id: req.body.id },
        { $set: { categoryName: req.body.category } },
        (err) => {
            if (err) {
                res.send({ flag: 0, message: err.message });
            } else {
                res.send({
                    flag: 1,
                    message: "Category name changed..!!",
                });
            }
        }
    );
};

module.exports = {
    addCategory,
    getCategory,
    deleteSubcategory,
    deleteCategory,
    editSubcategory,
    editCategory,
};
