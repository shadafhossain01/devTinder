const express=require("express")
const { handleSendRequest, handleReviewRequest } = require("../controller/request")
const { userAuth } = require("../middleware/auth")

const router=express.Router()

router.post("/send/:status/:toUserId",userAuth,handleSendRequest)
router.post("/review/:status/:tofromId", userAuth, handleReviewRequest);

module.exports=router