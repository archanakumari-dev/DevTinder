const mongoose=require("mongoose");
const dotenv =require("dotenv")
dotenv.config();

const connectDB=async()=>{
    try {
    const MONGOURL=process.env.MONGOURL;
    await mongoose.connect(MONGOURL);
    console.log("db connected successfully")
    } catch (error) {
    console.log(error.message+" Something went wrong")
    }
};

module.exports=connectDB;