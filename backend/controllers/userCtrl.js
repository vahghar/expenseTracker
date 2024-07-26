const asyncHandler = require('express-async-handler');
const User = require("../model/User");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

//User Registration

const usersController = {
    //Register
    //request is what the user is requesting from the application
    register: asyncHandler( async (req,res)=>{
        const {username,email,password} = req.body;

        //validate
        if(!username || !email || !password){
            throw new Error('please all fields are required');
        }

        //if user already exists
        const userExists = await User.findOne({email});
        if(userExists){
            throw new Error("user alr exists")
        }

        //hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        //create user and save to db
        const userCreated = await User.create({
            email,
            username,
            password: hashedPassword,
        });

        //send response
        res.json({
            username: userCreated.username,
            email: userCreated.email,
            id: userCreated.id,
        });
    }),

    //Login
    login: asyncHandler( async (req,res)=>{
        //get user data
        const {email,password} = req.body;

        //check if email is valid
        const user = await User.findOne({email});
        if(user){
            throw new Error("invalid login credentials")
        }

        //compare user password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            throw new Error("invalid login credentials");
        }

        //generate a token
        const token = jwt.sign({id: user._id},'bihariKey',{
            expiresIn: "30d",
        })

        //send response
        res.json({
            message: 'login success',
            token,
            id: user._id,
            email: user.email,
            username: user.username,
        })

    })

    //Profile
};

module.exports=usersController;