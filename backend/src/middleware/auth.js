const express = require("express");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser"); //needed for extrating it from req.cokkies
const User = require("../models/user");

const router = express.Router();
router.use(cookieParser());

router.use("/", async(req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({
        msg: "Please login",
      });
    }
    const decodedToken = await jwt.verify(token, process.env.JWTPASSWORD);
    const { _id } = decodedToken;
    const user = await User.findById(_id);
    if (!user) {
      return res.json({
        msg: "User not found",
      });
    }
    req.user = user;
    next();
  } 
  catch (error) {
    return res.json({
      error: error.message,
    });
  }
});

module.exports = router;
