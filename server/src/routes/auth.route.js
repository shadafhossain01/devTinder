const express = require("express");
const { userAuth } = require("../middleware/auth");
const { handleSignup, handleLogin, handleLogout } = require("../controller/auth");

const router = express.Router();

router.post("/singup", handleSignup);
router.post("/login", handleLogin);
router.get("/logout", userAuth, handleLogout);

module.exports = router;
