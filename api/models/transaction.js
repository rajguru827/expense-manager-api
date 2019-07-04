const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    credit: { type: Number }, // Income - 1
    debit: { type: Number }, // Expense - 2
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Transaction', transactionSchema);