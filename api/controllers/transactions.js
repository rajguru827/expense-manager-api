
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

exports.transactions_create_transaction = async (req, res, next) => {
    try {
        const transaction = new Transaction({
            _id: new mongoose.Types.ObjectId(),
            category: req.body.category,
            description: req.body.description,
            date: new Date(),
            account: req.body.account,
            user: req.userData.userId
        });

        const category = await Category.findById(req.body.category);

        if (category.type === 'income') {
            transaction.credit = parseFloat(req.body.amount)
        } else {
            transaction.debit = parseFloat(req.body.amount)
        }

        const account = await Account.findById(req.body.account);
        let bal = category.type === 'income' ? (account.initialBalance + parseFloat(req.body.amount)) : (account.initialBalance - parseFloat(req.body.amount));
        await Account.updateOne({ _id: req.body.account, user: req.userData.userId }, { $set: { initialBalance: bal } })

        transaction.save().then(docs => {
            res.status(200).json({
                count: docs.length,
                transaction: docs
            });
        }).catch(err => {
            res.status(500).json({
                error: err
            });
        });
    } catch (err) {
        throw err;
    }

}