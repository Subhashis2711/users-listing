const express = require("express");
const userRoute = require("./user.route");

const router = express.Router();

router.use("/users", userRoute);

const authRoute = require("./auth.route");
router.use("/auth", authRoute);


module.exports = router;
