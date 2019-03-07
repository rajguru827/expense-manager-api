const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../middleware/check-auth');
const Account = require('../models/account');

router.get('/', checkAuth,  (req, res, next) => {
    Account.find({user: req.userData.userId})
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
});


router.post('/', checkAuth, (req, res, next) => {
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
});

module.exports = router;