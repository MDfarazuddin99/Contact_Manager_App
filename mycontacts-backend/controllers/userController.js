const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { use } = require("bcrypt/promises");
//@desc Register a user
//@POST /api/users/register
//@access public
const registeruser = asyncHandler(async(req,res)=>{
    const{username,useremail,userpassword} = req.body;
    if(!username||!useremail||!userpassword){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const useravailiable = await User.findOne({useremail});
    if(useravailiable){
        res.status(400);
        throw new Error("user already registered");
    }

    //Hashed password
    const hashedPassword = await bcrypt.hash(userpassword,10);
    console.log("Hashed Password:",hashedPassword);
    const user = await User.create({
        username,
        useremail,
        userpassword:hashedPassword,
    });
    console.log(`user created ${user}`);
    if(user){
        res.status(201).json({_id:user.id,useremail:user.useremail});
    }else{
        res.status(400);
        throw new Error("User data is not valid");
    }
    res.json({message : "register the user"});
});


//@desc login a user
//@POST /api/users/login
//@access public

const loginuser = asyncHandler(async(req,res)=>{
    const{useremail,userpassword} = req.body;
    if(!useremail||!userpassword){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({useremail});
    //compare password with hashed password
    if(user && (await bcrypt.compare(userpassword,user.userpassword))){
        const accessToken = jwt.sign({
            //payload of user to assign to token
            user:{
                username:user.username,
                useremail:useremail,
                id:user.id,
            },
        },process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
        res.status(200).json({accessToken});
    }else{
        res.status(401);
        throw new Error("Password is not valid");
    }
    
});


//@desc current a user
//@GET /apo/users/current
//@access private
const currentuser = asyncHandler(async(req,res)=>{
    res.json(req.user);
});


module.exports = {registeruser,loginuser,currentuser};