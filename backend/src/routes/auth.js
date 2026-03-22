const express = require("express");
const validator=require("validator");
const bcrypt = require("bcrypt");
const User = require("../models/user.js");
const {validateData} = require("../utils/validation.js");
const jwt=require("jsonwebtoken");
const router = express.Router();

router.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      gender,
      age,
      about,
      photoUrl,
      skills,
    } = req.body;

    if (!validateData(req, res)) {
      return;
    }

    const alreadyUser = await User.findOne({ email });
    if (alreadyUser) {
      return res.status(400).json({
        msg: "user already exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
      photoUrl,
      about,
      skills,
    });

    await user.save();

    res.status(200).json({
      msg: "user created successfully",
    });

  } catch (error) {
    res.status(400).json({
      error:error.message
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        msg: "Enter email and password",
      });
    }
    if (!validator.isEmail(email)) {
      return res.status(401).json({
        
        msg: "invalid email",
      });

    }
    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(401).json({
        msg: "invalid credentials",
      });
    }
    
    const encryptedPassword = userExist.password;
    const isValidPassword = await bcrypt.compare(password, encryptedPassword);
    if (!isValidPassword) {
      return res.status(401).json({
        msg: "invalid crendtials",
      });
    }


    const token=jwt.sign({_id:userExist._id},process.env.JWTPASSWORD);
    res.cookie("token",token);

    res.status(200).json({
      user:userExist
    })
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      error:error.message,
    })
  }
});

router.post('/logout',(req,res)=>{
  try {
    res.cookie("token",null,{
      expires:new Date(Date.now())
    });
    res.status(200).json({
      msg:"user logout successfully"
    })
  } catch (error) {
    res.json({
      error:error.message
    })
  }
})
module.exports = router;
