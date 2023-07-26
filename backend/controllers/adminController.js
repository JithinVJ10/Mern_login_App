const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const generateToken = require('../utils/generateToken')

const adminCred = {
    adminEmail:'admin@gmail.com',
    adminName:'Admin',
    adminPassword:'admin123',
    adminId: '123456'
}

exports.adminLogin = asyncHandler(async (req,res)=>{
    const {email, password} = req.body
    const adminId = adminCred.adminId
    const adminEmail = adminCred.adminEmail
    const adminName = adminCred.adminName

    if (adminEmail === email && adminCred.adminPassword === password) {
        generateToken(res,adminCred.adminId)
        res.status(201).json({
            adminId,
            adminEmail,
            adminName
        })
    }
    else {
        res.status(400)
        throw new Error("Invaild Email or password")
    }
})

exports.getUser = asyncHandler(async (req,res)=>{
    const user = await User.find()
    res.status(200).json(user)
})


exports.updateUser = async (req, res) => {
    const { id } = req.params;
    const { userDataToEdit } = req.body;
    console.log(req.body,'data vanuu')
    const name = userDataToEdit.name
    const email = userDataToEdit.email
    
    const updateUser=await User.findByIdAndUpdate(id,{name,email},{new:true})
    console.log(updateUser);

    if (updateUser) {
        res.status(200).json(updateUser)
    }else{
        res.status(200).json("not found")
    }

}
  

exports.removeUser = asyncHandler(async (req,res)=>{
    const id = req.params.id
    const user = await User.findByIdAndRemove(id)

    if(!user){
        res.status(404).json({message:'user not deleted'})
    }else{
        res.status(200).json({message:'user deleted successfully'})
    }
})