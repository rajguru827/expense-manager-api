const express = require("express");
const router = express.Router();

const CategoriesController = require('../controllers/categories');

router.get('/', CategoriesController.categories_get_all)

router.post('/', CategoriesController.categories_create_category);

module.exports = router;
