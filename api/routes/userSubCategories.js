const express = require("express");
const router = express.Router();

const checkAuth = require('../middleware/check-auth');
const UserSubCategoriesController = require('../controllers/userSubCategories');

router.post('/', UserSubCategoriesController.user_subCategories_create_category);

module.exports = router;
