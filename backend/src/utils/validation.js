const validator=require("validator");

const validateData=(req,res)=>{
    const {firstName,lastName,email,password}=req.body;
    if(!firstName || !lastName){
         res.status(400).json({
            msg:"Enter first and last name"
        }) 
        return false;      
    }
    else if(!validator.isEmail(email)){
        res.status(400).json({
            msg:"Email is invalid"
        })
        return false; 
    }
    else if(!validator.isStrongPassword(password)){
         res.status(400).json({
            msg:"Password is not strong"
        }) 
         return false;        
    }
    return true;
}

const validateEditFields=(req)=>{
    const allowedEditableFields=[
        "firstName",
        "lastName",
        "password",
        "gender",
        "age",
        "about",
        "skills",
        "photoURL"
    ]
    const isEditAllowed=Object.keys(req.body).every(
        (field)=>(
        allowedEditableFields.includes(field)
        )
    );
    return isEditAllowed;
}

module.exports={
    validateData,
    validateEditFields
};