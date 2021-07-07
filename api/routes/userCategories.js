const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const UserCategoriesController = require('../controllers/userCategories');

router.get('/', checkAuth, UserCategoriesController.user_categories_get_all)

router.post('/', checkAuth, UserCategoriesController.user_categories_create_category);

module.exports = router;
