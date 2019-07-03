const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const IncomeCategory = require('../models/incomeCategory');

router.get('/', (req, res, next) => {
    IncomeCategory.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                incomeCategories: docs
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
    const incomeCategory = new IncomeCategory({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });
    incomeCategory.save().then(result => {
        res.status(201).json({
            message: 'Created Income Category successfully.',
            incomeCategory: {
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
