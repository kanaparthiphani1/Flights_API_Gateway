const express = require("express");

const { InfoController } = require("../../controllers");
const { AuthMiddleware } = require("../../middlewares");

const UserRouter = require("./user-router");

const router = express.Router();

router.get("/info", AuthMiddleware.checkAuth, InfoController.info);
router.use("/user", UserRouter);

module.exports = router;
