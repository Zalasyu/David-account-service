// Author: Alec Moldovan
// Description: Routes that imports middleware for Role-Based Access Control.
const express = require('express');
const userController = require('../controller/account.controller');

const router = express.Router();

// CREATE: Create a user account
router.post('/signup', userController.signup);

// Authenticate User login
router.post('/login', userController.login);

// READ: Get User info
router.get('/user/:userId',
  userController.allowIfLoggedin, 
  userController.getUser);

// READ: Get All users
// grantAccess middleware invoked. 
// We only grant access tp roles that are permitted to perform
// the specified action on the provided resource.
router.get('/users', 
  userController.allowIfLoggedin, 
  userController.grantAccess('readAny', 'profile'), 
  userController.getUsers);

// UPDATE: Update user info
router.put('/user/:userId', 
  userController.allowIfLoggedin, 
  userController.grantAccess('updateAny', 'profile'), 
  userController.updateUser);

// DELETE: Delete user account via userid
router.delete('/user/:userId', 
  userController.allowIfLoggedin, 
  userController.grantAccess('deleteAny', 'profile'), 
  userController.deleteUser);

module.exports = router;
