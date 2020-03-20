
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const Category = require('../models/category');
const Account = require('../models/account');

exports.transactions_get_all = (req, res, next) => {
    Transaction.find({ user: req.userData.userId })
        .populate('category')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                transactions: docs
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.transactions_create_transaction = (req, res, next) => {
    const transaction = new Transaction({
        _id: new mongoose.Types.ObjectId(),
        category: req.body.category,
        description: req.body.description,
        date: new Date(),
        account: req.body.account,
        user: req.userData.userId
    });
    Category.findById(req.body.category)
        .exec()
        .then(result => {
            if (result.type === 1) {
                transaction.credit = parseFloat(req.body.amount)
            } else if (result.type === 2) {
                transaction.debit = parseFloat(req.body.amount)
            }
            transaction.save().then(result1 => {
                Account.findById(req.body.account)
                    .exec()
                    .then(response => {
                        let bal = result.type === 1 ? (response.initialBalance + parseFloat(req.body.amount)) : (response.initialBalance - parseFloat(req.body.amount));
                        Account.updateOne({ _id: req.body.account, user: req.userData.userId }, { $set: { initialBalance: bal } })
                            .exec()
                            .then(data => {
                                res.status(201).json({
                                    message: 'Created Account Type successfully.',
                                    transaction: result1
                                });
                            })
                            .catch(err => {
                                res.status(500).json({
                                    error: err
                                });
                            })
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    })
            }).catch(err => {
                res.status(500).json({
                    error: err
                });
            })
        });
}