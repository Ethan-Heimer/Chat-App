const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router.post("/signIn", userController.signIn);
router.post("/signUp", userController.signUp);
router.post("/authenticate", userController.authenticate);

module.exports = router;