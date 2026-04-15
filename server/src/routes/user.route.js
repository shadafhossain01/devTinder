const express = require("express");
const { handleReceivedRequest, handleConnection, handleFeed } = require("../controller/user");
const { userAuth } = require("../middleware/auth");

const router = express.Router();

router.get("/feed", userAuth, handleFeed);
router.get("/connections", userAuth, handleConnection);
router.get("/requests/received", userAuth, handleReceivedRequest);

module.exports = router;
