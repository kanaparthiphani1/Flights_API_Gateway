const express = require("express");
const { UserController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");
const router = express.Router();

router.post("/", AuthMiddleware.validateAuthRequest, UserController.signup);
router.post(
  "/signin",
  AuthMiddleware.validateAuthRequest,
  UserController.signin
);
router.post(
  "/role",
  AuthMiddleware.checkAuth,
  AuthMiddleware.isAdmin,
  UserController.addRoleToUser
);

module.exports = router;
