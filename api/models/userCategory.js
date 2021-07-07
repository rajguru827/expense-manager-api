const mongoose = require('mongoose');

const userCategorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    subCategories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserSubCategory'
    }],
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

module.exports = mongoose.model('UserCategory', userCategorySchema);