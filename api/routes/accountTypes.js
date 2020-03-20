const express = require("express");
const router = express.Router();

const AccountTypesController = require('../controllers/accountTypes');

router.get('/', AccountTypesController.accountTypes_get_all);

router.post('/', AccountTypesController.accountTypes_create_accountType);

module.exports = router;