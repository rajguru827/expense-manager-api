const mongoose = require('mongoose');

const userSubCategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    userCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserCategory',
        required: true
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdDate: {
        type: Date,
        default: Date.now
    },
    updatedDate: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserSubCategory', userSubCategorySchema);