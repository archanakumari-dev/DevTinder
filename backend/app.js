const express=require("express")
const cors=require('cors');
const connectDB=require("./src/config/db.js")
const app=express(); // const app=express.Router() can be written like this too
app.use(express.json());

// app.use(cors()); //for cross origin issue handling
// but for handling cookiees too we have to use cors with credentials

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    https:false
}))

const PORT=process.env.PORT|3000

try{
    const authRouter=require("./src/routes/auth.js");
    const profileRouter=require('./src/routes/profile.js')
    const requestRouter =require("./src/routes/request.js")
    const userRouter=require('./src/routes/user.js')
    
    app.use("/",authRouter);
    app.use('/',profileRouter);
    app.use('/',requestRouter);
    app.use('/',userRouter);
    
}
catch(err){
    console.log(err.message);
}
connectDB().then(()=>{
    try {
         app.listen(PORT,()=>{
         console.log("server is listening on port "+PORT)
    }); 
    } catch (error) {
        console.log(error.message)
    }
    
})