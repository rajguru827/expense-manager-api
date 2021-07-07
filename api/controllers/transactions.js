
const mongoose = require('mongoose');
const Transaction = require('../models/transaction');
const UserCategory = require('../models/userCategory');
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
            date: new Date(), // Todo Send date of transcation from client
            account: req.body.account,
            user: req.userData.userId
        });       

        //get category type
        //Todo: category type from client
        const category = await UserCategory.findById(req.body.category);

        if (category.type === 'income') {
            transaction.credit = parseFloat(req.body.amount)
        } else {
            transaction.debit = parseFloat(req.body.amount)
        }

         //add transcation
         const saveTransaction  = await transaction.save()

        //update account balance
        const account = await Account.findById(req.body.account);
        let bal = category.type === 'income' ? (account.initialBalance + parseFloat(req.body.amount)) : (account.initialBalance - parseFloat(req.body.amount));
        await Account.updateOne({ _id: req.body.account, user: req.userData.userId }, { $set: { initialBalance: bal } })

        res.status(200).json({
            message: `${category.type} added successfully`, // Todo convert to capitalize
            transaction: saveTransaction
        });
        
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        });
    }

}