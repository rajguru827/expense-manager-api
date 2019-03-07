const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const AccountType = require('../models/accountType');

router.get('/', checkAuth, (req, res, next) => {
    AccountType.find()
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                accountTypes: docs
            };
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', checkAuth, (req, res, next) => {
    const accountType = new AccountType({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });
    accountType.save().then(result => {
        res.status(201).json({
            message: 'Created Account Type successfully.',
            accountType: {
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