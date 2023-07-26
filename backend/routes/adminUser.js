const express = require('express')
const router = express.Router()
const adminController = require('../controllers/adminController')




router.get('/',adminController.getUser)

router.post('/adminLogin',adminController.adminLogin)

router.put('/updateUser/:id', adminController.updateUser);

router.delete('/removeUser/:id',adminController.removeUser)

module.exports = router