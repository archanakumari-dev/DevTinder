const express = require("express");
const router = express.Router();
const authUser = require("../middleware/auth.js");
const {validateEditFields} = require("../utils/validation.js");

router.get("/profile/view", authUser, (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      user
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

router.patch("/profile/edit", authUser, async (req, res) => {
  try {
    if (!validateEditFields(req)) {
      return res.json({
        msg: "Cannot update profile",
      });
    }
    const loggedInUser = req.user;
    Object.keys(req.body).forEach(
      (field) => (loggedInUser[field] = req.body[field])
    );

    await loggedInUser.save();
    
    res.status(200).json({
      msg: "profile updated successfully",
      data:loggedInUser
    });
  } catch (error) {
    res.status(400).json({
      error: error.message,
    });
  }
});

module.exports = router;
