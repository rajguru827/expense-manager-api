const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const ExpenseCategory = require('../models/expenseCategory');

router.get('/', (req, res, next) => {
    ExpenseCategory.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                expenseCategories: docs
            };
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', (req, res, next) => {
    const expenseCategory = new ExpenseCategory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });
    expenseCategory.save().then(result => {
        res.status(201).json({
            message: 'Created Expense Category successfully.',
            expenseCategory: {
                name: result.name,
                description: result.description,
                _id: result._id
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
});

module.exports = router;
