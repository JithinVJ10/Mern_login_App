const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

// POST - Login user
exports.authUser = asyncHandler(async (req,res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await user.matchPassword(password))) {
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email : user.email
        })
    } else {
        res.status(400)
        throw new Error("Invaild Email or password")
    }


})

// POST- register user
exports.registerUser = asyncHandler(async (req,res)=>{

    const {name,email, password} = req.body
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400)
      throw new Error('User Already Exists')
    }

    // Create a new user
    const user = new User({ name, email, password });

    await user.save()

    if (user) {
        generateToken(res,user._id)
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email : user.email
        })
    } else {
        res.status(400)
        throw new Error("Server error while adding user")
    }
})

//POST -logout user
exports.logoutUser = asyncHandler(async (req,res)=>{
    res.cookie('jwt','',{
        httpOnly: true,
        expires: new Date(0)
    })
    res.status(200).json({message:"User Logout"})
})

// GET- User Profile
exports.getUserProfile = asyncHandler(async (req,res)=>{
    const { _id, name , email} = req.user
    const user = {
        _id,
        name,
        email
    }
    res.status(200).json(user)
})

// PUT - update user profile
exports.updateUserProfile = asyncHandler(async (req,res)=>{
    const { _id } = req.user
    
    const user = await User.findbyId(_id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        
        if (req.body.password) {
            user.password = req.body.password
        }
        const updatedUser = user.save()

        res.status(200).json({
            _id : updatedUser._id,
            name : updatedUser.name,
            email : updatedUser.email,
        })
    } else {
        res.status(404)
        throw new Error("User not Found")
    }


    // res.status(200).json({message:" Update User Profile"})
})

