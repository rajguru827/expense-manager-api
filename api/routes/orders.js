const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Order = require('../models/order');

router.get('/', (req, res, next) => {
    Order
        .find()
        .select('product quantity _id')
        .populate('product', 'name _id price')
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
});

router.post('/', (req, res, next) => {
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    })
    order.save()
        .then(result => {
            res.status(201).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.get('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order
        .findById(id)
        .populate('product', 'name _id price')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json(doc);
            } else {
                res.status(400).json({
                    message: 'No valid entry found!'
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete('/:orderId', (req, res, next) => {
    const id = req.params.orderId;
    Order.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


module.exports = router;