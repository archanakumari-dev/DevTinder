const express = require("express");
const userAuth = require("../middleware/auth.js");
const ConnectionRequestModel = require("../models/connectionRequest");
const User = require("../models/user.js");
const router = express.Router();

const USER_SAFE_DATA = "firstName lastName gender age about skills photoUrl";

router.post("/user/review/:status/:requestId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { status, requestId } = req.params;

    const allowedStatus = ["accepted", "rejected"];
    if (!allowedStatus.includes(status)) {
      return res.json({
        msg: "status is not allowed",
      });
    }

    const connectionRequest = await ConnectionRequestModel.findOne({
      _id: requestId,
      toUserId: loggedInUser._id,
      status: "interested",
    });

    if (!connectionRequest) {
      return res.status(404).json({
        msg: "No such connection request found",
      });
    }

    connectionRequest.status = status;
    const data = await connectionRequest.save();

    res.status(200).json({
      msg: "Request " + status,
      success: true,
      //   data,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
});

router.get("/user/request/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const connections = await ConnectionRequestModel.find({
      toUserId: loggedInUser._id,
      status: "interested",
    }).populate("fromUserId", "firstName lastName");

    if (!connections) {
      res.json({
        msg: "connections not found",
      });
    }

    return res.status(200).json({
      data: connections,
    });
  } catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

router.get("/user/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequestModel.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA);

    if (!connections) {
      return res.json({
        msg: "zero connections found",
      });
    }

    const data = connections.map((item) => {
      if (item.fromUserId.equals(loggedInUser._id)) return item.toUserId;
      else return item.fromUserId;
    });

    return res.status(200).json({
      data: data,
    });
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
});

router.get("/user/feed", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const page=req.query.page || 1
    let limit=req.query.limit ||10
    limit= limit>50?50:limit
    const skip=(page-1)*limit

    const connectionRequest = await ConnectionRequestModel.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();

    connectionRequest.forEach((item) => {
      hideUserFromFeed.add(item.fromUserId.toString());
      hideUserFromFeed.add(item.toUserId.toString());
    });

    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUserFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
    .select(USER_SAFE_DATA)
    .skip(skip)
    .limit(limit);

    return res.status(200).json({
      users,
    });
  } catch (error) {
    return res.json({
      error:error.message
    })
  }
});

module.exports = router;
