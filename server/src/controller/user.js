const Connection = require("../model/connection.model");
const User = require("../model/user.model");

const handleReceivedRequest = async (req, res) => {
  const loginUser = req.user;
  const requests = await Connection.find({
    toUserId: loginUser._id,
    status: "interested",
  }).populate("fromUserId", [
    "fullname",
    "about",
    "age",
    "gender",
    "skills",
    "imageUrl",
  ]);

  const data = requests.map((item) => item.fromUserId);

  res.status(200).json({
    success: true,
    data,
  });
};

const handleConnection = async (req, res) => {
  const loginUser = req.user;
  const requests = await Connection.find({
    $or: [
      { fromUserId: loginUser._id, status: "accepted" },
      { toUserId: loginUser._id, status: "accepted" },
    ],
  })
    .populate("fromUserId", [
      "fullname",
      "about",
      "age",
      "gender",
      "skills",
      "imageUrl",
    ])
    .populate("toUserId", [
      "fullname",
      "about",
      "age",
      "gender",
      "skills",
      "imageUrl",
    ]);

  const data = requests.map((item) => {
    if (item.toUserId.equals(loginUser._id)) {
      return item.fromUserId;
    }
    return item.toUserId;
  });

  res.status(200).json({
    success: true,
    data,
  });
};

const handleFeed = async (req, res) => {
  const loginUser = req.user;
  const page = parseInt(req.query.page) || 1;
  let limit = parseInt(req.query.limit) || 10;
  limit > 50 ? 50 : limit;
  const skip=(page-1)*limit

  try {
    const connections = await Connection.find({
      $or: [{ fromUserId: loginUser._id }, { toUserId: loginUser._id }],
    });

    const hideConnections = new Set();
    connections.forEach((item) => {
      hideConnections.add(item.fromUserId.toString());
      hideConnections.add(item.toUserId.toString());
    });

    const data = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideConnections) } },
        { _id: { $ne: loginUser._id } },
      ],
    }).select("fullname age gender skills imageUrl").skip(skip).limit(limit);

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { handleReceivedRequest, handleConnection, handleFeed };
