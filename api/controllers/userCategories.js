const mongoose = require("mongoose");

const UserCategory = require('../models/userCategory');

exports.user_categories_get_all = (req, res, next) => {
    UserCategory.find({ user: req.userData.userId })
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

exports.user_categories_create_category = (req, res, next) => {
    const userCategory = new UserCategory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        type: req.body.type,
        user: req.userData.userId
    });
    userCategory.save().then(result => {
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