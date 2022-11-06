const express = require("express");
const validate = require("../../middlewares/validate");
const userController = require("../../controllers/user.controller");
const auth = require("../../middlewares/auth");

const router = express.Router();

router.get(
  "/",
  auth,
  userController.getUsers
);


module.exports = router;
