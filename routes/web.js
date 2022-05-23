// this use login system

// import express from 'express'
const express = require('express');
const router = express.Router()
// import UserController from '../controllers/userController.js'
const UserController = require('../controllers/userController.js');


router.get('/', UserController.home)
router.get('/registration', UserController.registration)
router.post('/registration', UserController.createUserDoc)
router.get('/login', UserController.login)
router.post('/login', UserController.verifyLogin)

// export default router;
module.exports = router;