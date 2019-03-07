const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    description: { type: String, required: true },
    initialBalance: { type: Number, required: true },
    accountType: { type: mongoose.Schema.Types.ObjectId, ref: 'AccountType', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Account', accountSchema);