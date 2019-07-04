const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: Number, required: true },
    createdDate: { type: Date, required: true }
});

module.exports = mongoose.model('Category', categorySchema);