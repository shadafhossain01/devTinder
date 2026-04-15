const Connection = require("../model/connection.model");
const User = require("../model/user.model");

const handleSendRequest = async (req, res) => {
  const { status, toUserId } = req.params;
  const fromUser = req.user;

  try {
    const allowedStatus = ["ignored", "interested"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Status is not valid");
    }

    const toUser = await User.findOne({ _id: toUserId });
    if (!toUser) {
      throw new Error("User is not found");
    }

    if (fromUser._id.equals(toUser._id)) {
      throw new Error("You can not send Request yourself");
    }

    const connection = await Connection.findOne({
      $or: [
        { fromUserId: fromUser._id, toUserId: toUser._id },
        { fromUserId: toUser._id, toUserId: fromUser._id },
      ],
    });

    if (connection) {
      throw new Error("Connection Already Found");
    }

    Connection.create({
      fromUserId: fromUser._id,
      toUserId: toUser._id,
      status: status,
    });

    res.status(200).json({
      sucess: true,
      message: "Sending Request to " + toUser.fullname + " is Successfull",
    });
  } catch (error) {
    res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

const handleReviewRequest = async (req, res) => {
  const { status, tofromId } = req.params;
  const fromUser = req.user;
  try {
    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      throw new Error("Status is not valid");
    }

    const toUser = await User.findOne({ _id: tofromId });
    if (!toUser) {
      throw new Error("User is not found");
    }

    const findConnection = await Connection.findOne({
      fromUserId: tofromId,
      toUserId: fromUser._id,
      status: "interested",
    });
    if (!findConnection) {
      throw new Error("Connection is not found");
    }

    findConnection.status = status;
    await findConnection.save()

    res.status(200).json({
      sucess: true,
      message: fromUser.fullname+" " + status +" your Connection."
    });

  } catch (error) {
        res.status(400).json({
          sucess: false,
          message: error.message,
        });
  }
};

module.exports = { handleSendRequest, handleReviewRequest };
