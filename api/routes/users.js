const express = require("express");
const router = express.Router();

const UserController = require('../controllers/users');

router.post("/signup", UserController.users_create_user);

router.get("/users", UserController.users_get_all);

router.post("/login", UserController.users_login_user);

router.delete("/:userId", UserController.users_delete_user);

module.exports = router;