//accepted,rejected,interseted,ignored
const express=require("express");
const User=require("../models/user.js")
const authUser=require("../middleware/auth.js");
const ConnectionRequestModel=require("../models/connectionRequest.js")
const router=express.Router();


router.post('/request/send/:status/:toUserId',authUser,async(req,res)=>{
   try{
     const fromUser=req.user;
     const fromUserId=fromUser._id;
     const toUserId=req.params.toUserId;
     const status=req.params.status;

     const toUser=await User.findById(toUserId);
     if(!toUser){
        return res.status(400).json({
            msg:"User not found"
        })
     }
     const allowedStatus=["interested","ignored"];
     if(!allowedStatus.includes(status)){
        return res.json({
            msg:"Status invalid"
        })
     }
     
     if(fromUserId.equals(toUserId)){
        return res.status(401).json({
            msg:"Cannot send request to yourself"
        })
     }

    const existingConnectionRequest=await ConnectionRequestModel.findOne({
        $or:[
           {fromUserId,toUserId},
           {fromUserId:toUserId,toUserId:fromUserId}
        ]
    });

    if(existingConnectionRequest){
        return res.json({
            msg:'Already sent or recieve the connection request'
        })
    }

    const connectionRequest=new ConnectionRequestModel({
        toUserId,fromUserId,status
    });

    await connectionRequest.save();

    res.status(200).json({
        msg:fromUser.firstName+" "+status+" "+toUser.firstName
    })
     
   }catch(error){
    res.status(400).json({
        error:error.message
    })
   }
})

module.exports=router;
