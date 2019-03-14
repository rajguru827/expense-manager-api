const express = require("express");
const router = express.Router();
const checkAuth = require('../middleware/check-auth');
const AccountsController = require('../controllers/accounts');

router.get('/', checkAuth,  AccountsController.accounts_get_all);

router.post('/', checkAuth, AccountsController.accounts_create_account);

router.get('/:accountId', checkAuth, AccountsController.accounts_get_account);

router.delete('/:accountId', checkAuth, AccountsController.accounts_delete_account);

module.exports = router;