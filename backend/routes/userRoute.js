const express = require('express')
const userController = require('../controllers/userController')
const protect =require('../middleware/authMiddleware')
const router = express()
const upload = require('../middleware/imageUploadMW')




router.post('/',userController.registerUser)
router.post('/auth',userController.authUser )
router.post('/logout',userController.logoutUser)
router.get('/profile',protect,userController.getUserProfile)
router.put('/profile', upload,protect,userController.updateUserProfile)


module.exports = router