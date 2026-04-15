const express = require("express");
const { userAuth } = require("../middleware/auth");

const { handleProfileUpdate, handleShowProfile} = require("../controller/profile");

const router = express.Router();

router.get("/", userAuth, handleShowProfile);
router.patch("/edit", userAuth, handleProfileUpdate);

module.exports = router;
