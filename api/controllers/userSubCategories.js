const mongoose = require("mongoose");

const UserCategory = require('../models/userCategory');
const UserSubCategory = require('../models/userSubCategory');


exports.user_subCategories_create_category = async(req, res, next) => {
    try {
        const subCategory = new UserSubCategory({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            user: req.userData.userId
        });
        const saveUserSubCategory = await subCategory.save();

        const userCategory = await UserCategory.findById(req.body.category);
        userCategory.subCategories.push(subCategory);
        await userCategory.save();

        res.status(201).json({
            message: 'Created Sub Category successfully.',
            category: saveUserSubCategory
        });
        
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};