const mongoose=require("mongoose");
const validator=require("validator")

const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        minLength:3,
        maxLength:35,
        required:true
    },
    lastName:{
        type:String
    },
    email:{
        type:String,
        unique:true,
        required:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Email is invalid")
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isStrongPassword(value)){
                throw new Error("Enter storng password")
            }
        }
    },
    gender:{
        type:String,
        required:false,
        trim:true,
        enum:["Male","Female","Others",'male','female','others'],
        validate(value){
            if(!['Male','Female','Others','male','female','others'].includes(value)){
                throw new Error("Not a valid gender")
            }
        }
    },
    age:{
        type:Number,
        required:false,
        min:18
    },
    about:{
        type:String,
        required:false,
        trim:true,
    },
    skills:{
        type:[String],
        required:false
    },
    photoUrl:{
        type:String,
        required:false,
        validate(value){
            if(!validator.isURL(value)){
                throw new Error("photo url is invalid")
            }
        }
    }
},{timestamps:true})

const User=mongoose.model("User",userSchema);
module.exports=User;