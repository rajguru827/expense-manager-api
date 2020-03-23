const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const userRoutes = require('./api/routes/users');
const accountTypeRoutes = require('./api/routes/accountTypes');
const categoryRoutes = require('./api/routes/categories');
const subCategoryRoutes = require('./api/routes/subCategories');
const accountRoutes = require('./api/routes/accounts');
const transactionRoutes = require('./api/routes/transactions');

mongoose.connect('mongodb://localhost:27017/expense-manager', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
});

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    )
    if (req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
        return res.status(200).json({});
    }
    next();
})

app.use('/user', userRoutes);
app.use('/accountType', accountTypeRoutes)
app.use('/category', categoryRoutes)
app.use('/subCategory', subCategoryRoutes)
app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes)

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;