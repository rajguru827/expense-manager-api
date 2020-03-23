const express = require("express");
const router = express.Router();

const SubCategoriesController = require('../controllers/subCategories');

router.post('/', SubCategoriesController.subCategories_create_category);

module.exports = router;
