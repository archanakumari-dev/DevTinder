const mongoose=require("mongoose");
const User = require("./user");


const connectionRequestSchema=new mongoose.Schema({
   "fromUserId":{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:User
   },
   "toUserId":{
    type:mongoose.Schema.Types.ObjectId,
    required:true,
    ref:User
   },
   "status":{
    type:String,
    required:true,
    enum:{
      values: ["interested","ignored","accepted","rejected"],
      message:"Invalid status type"
    }
   }
},{timestamps:true})

connectionRequestSchema.index({
  fromUserId:1,
  toUserId:1
});


const ConnectionRequestModel=mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports=ConnectionRequestModel;