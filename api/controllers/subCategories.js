const mongoose = require("mongoose");

const Category = require('../models/category');
const SubCategory = require('../models/subCategory');


exports.subCategories_create_category = async(req, res, next) => {
    try {
        const subCategory = new SubCategory({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            description: req.body.description,
            category: req.body.category
        });
        const saveSubCategory = await subCategory.save();

        const category = await Category.findById(req.body.category);
        category.subCategories.push(subCategory);
        await category.save();

        res.status(201).json({
            message: 'Created Sub Category successfully.',
            category: saveSubCategory
        });
        
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
};