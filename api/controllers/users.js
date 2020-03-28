const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Category = require('../models/category');
const SubCategory = require('../models/subCategory');
const UserCategory = require('../models/userCategory');
const UserSubCategory = require('../models/userSubCategory');

exports.users_create_user = async (req, res, next) => {
    try {
        User.find({ email: req.body.email })
            .exec()
            .then(user => {
                if (user.length >= 1) {
                    return res.status(409).json({
                        message: "Mail exists"
                    });
                } else {
                    bcrypt.hash(req.body.password, 10, async (err, hash) => {
                        if (err) {
                            return res.status(500).json({
                                error: err
                            });
                        } else {
                            const user = new User({
                                _id: new mongoose.Types.ObjectId(),
                                email: req.body.email,
                                password: hash
                            });
                            // save user
                            await user.save();

                            //add categories and sub categories to user categories

                            const categories = await Category.find();
                            const subCategories = await SubCategory.find();

                            categories.forEach(async (category) => {

                                //save user categories
                                const userCategory = new UserCategory({
                                    _id: new mongoose.Types.ObjectId(),
                                    name: category.name,
                                    description: category.description,
                                    type: category.type,
                                    user: user._id
                                });

                                // save sub user categories
                                const subCategories = await SubCategory.find({ category: category._id });
                                console.log(subCategories);
                                if (subCategories && subCategories.length) {
                                    subCategories.forEach(async (subCategory) => {
                                        const userSubCategory = new UserSubCategory({
                                            _id: new mongoose.Types.ObjectId(),
                                            name: subCategory.name,
                                            description: subCategory.description,
                                            userCategory: userCategory._id,
                                            user: user._id
                                        });
                                        userCategory.subCategories.push(userSubCategory);
                                        await userSubCategory.save();
                                    })
                                }
                                
                                await userCategory.save();
                            })

                            res.status(201).json({
                                message: "User created"
                            });
                        }
                    });
                }
            });
    } catch (err) {
        res.status(500).json({
            error: err
        });
    }
}

exports.users_get_all = (req, res, next) => {
    User.find()
        .exec()
        .then(docs => {
            console.log(docs)
            const response = {
                count: docs.length,
                users_create_user: docs
            };
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        })
}

exports.users_login_user = (req, res, next) => {
    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length < 1) {
                return res.status(401).json({
                    message: 'Auth Failed'
                })
            }

            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: 'Auth Failed'
                    })
                }

                if (result) {
                    const token = jwt.sign({
                        email: user[0].email,
                        userId: user[0]._id
                    }, 'secret', {
                        expiresIn: '1h'
                    })
                    return res.status(200).json({
                        message: 'Auth Successful',
                        token: token
                    });
                }

                return res.status(401).json({
                    message: 'Auth Failed'
                })
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
}

exports.users_delete_user = (req, res, next) => {
    User.remove({ _id: req.params.userId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "User deleted"
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}