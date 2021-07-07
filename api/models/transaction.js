const mongoose = require('mongoose');

const transactionSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'UserCategory', required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    credit: { type: Number, required: function() {
        return !this.debit
    }}, // Income - 1
    debit: { type: Number, required: function() {
        return !this.credit
    }}, // Expense - 2
    account: { type: mongoose.Schema.Types.ObjectId, ref: 'Account'},
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

module.exports = mongoose.model('Transaction', transactionSchema);