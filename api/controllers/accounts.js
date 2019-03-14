const mongoose = require("mongoose");

const Account = require("../models/account");

exports.accounts_get_all = (req, res, next) => {
    Account.find({ user: req.userData.userId })
        .select("accountType name description initialBalance  _id user")
        .populate('user accountType')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                accounts: docs.map(doc => {
                    return {
                        _id: doc._id,
                        name: doc.name,
                        description: doc.description,
                        initialBalance: doc.initialBalance,
                        accountType: doc.accountType,
                        user: doc.user,
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.accounts_create_account = (req, res, next) => {
    const account = new Account({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        description: req.body.description,
        initialBalance: req.body.initialBalance,
        accountType: req.body.accountType,
        user: req.userData.userId
    });
    account.save().then(result => {
        res.status(201).json({
            message: 'Created Account Type successfully.',
            account: {
                name: result.name,
                description: result.description,
                initialBalance: result.initialBalance,
                _id: result._id
            }
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    })
}

exports.accounts_get_account = (req, res, next) => {
    Account.findOne({ _id: req.params.accountId, user: req.userData.userId })
        .select("accountType name description initialBalance  _id user")
        .populate('user accountType')
        .exec()
        .then(account => {
            if (!account) {
                return res.status(404).json({
                    message: "Account not found"
                });
            }
            res.status(200).json({
                account: account,
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}

exports.accounts_delete_account = (req, res, next) => {
    Account.deleteOne({ _id: req.params.accountId,  user: req.userData.userId })
        .exec()
        .then(result => {
            console.log(result)
            res.status(200).json({
                result: result,
                message: "Account deleted",
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
}