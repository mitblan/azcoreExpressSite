// const express = require( 'express' )
import express from 'express'
// const {loginUser,
//   loginUserForm,
//   registerUser,
//   registerUserForm,
//   logoutUser,
//   getProfile,
//   updateUserProfile,
//   updateUserProfileForm,
//   deleteUser } = require( '../controllers/userController' )
import {loginUser,
  loginUserForm,
  registerUser,
  registerUserForm,
  logoutUser,
  getProfile,
  updateUserProfile,
  updateUserProfileForm,
  deleteUser
} from '../controllers/userController.js'
  import { protect } from '../middleware/authMiddleware.js'
  
const router = express.Router()
  
router.route( '/login').get(loginUserForm).post(loginUser)
router.route( '/register').get(registerUserForm).post(registerUser)
router.post( '/logout', logoutUser )
router.route('/profile').get(protect, getProfile).put(updateUserProfile)
router.get( '/profile/edit', updateUserProfileForm )
router.delete( '/delete', deleteUser )

export default router