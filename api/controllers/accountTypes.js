
const mongoose = require('mongoose');
const AccountType = require('../models/accountType');

exports.accountTypes_get_all = (req, res, next) => {
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
}

exports.accountTypes_create_accountType = (req, res, next) => {
    const accountType = new AccountType({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description
    });
    accountType.save().then(result => {
        res.status(201).json({
            message: 'Created Account Type successfully.',
            accountType: result
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
}