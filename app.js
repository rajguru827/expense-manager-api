const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const accountTypeRoutes = require('./api/routes/accountTypes');
const expenseCategoryRoutes = require('./api/routes/expenseCategories');
const incomeCategoryRoutes = require('./api/routes/incomeCategories');
const accountRoutes = require('./api/routes/accounts');

mongoose.connect('mongodb+srv://dbUser:8142188847@cluster0-ke2qb.mongodb.net/test?retryWrites=true', {
    useNewUrlParser: true
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

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes);
app.use('/accountType', accountTypeRoutes)
app.use('/expenseCategory', expenseCategoryRoutes)
app.use('/incomeCategory', incomeCategoryRoutes)
app.use('/accounts', accountRoutes);

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