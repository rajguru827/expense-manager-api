const mongoose = require("mongoose");

const Category = require('../models/category');

exports.categories_get_all = (req, res, next) => {
    Category.find()
        .populate('subCategories')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                categories: docs
            };
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.categories_create_category = (req, res, next) => {
    const category = new Category({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type
    });
    category.save().then(result => {
        res.status(201).json({
            message: 'Created Category successfully.',
            category: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
};