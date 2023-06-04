const {loginUser,
  loginUserForm,
  registerUser,
  logoutUser,
  getProfile,
  updateUserProfile,
  updateUserProfileForm,
  deleteUser,
  legacyAccountCreate} = require( '../controllers/userController' )
const express = require( 'express' )
const passport = require( 'passport' )

const {protect} = require('../middleware/protect')
  
const router = express.Router()
  
router.route( '/login').get(loginUserForm).post(passport.authenticate( 'local', {
  successReturnToOrRedirect: '/user/profile',
  failureRedirect: '/user/login',
  failureMessage: true,
  keepSessionInfo: true,
} ))
router.route( '/register').get(registerUser).post(registerUser)
router.get( '/logout', logoutUser )
router.route('/profile').get(protect, getProfile).put(protect, updateUserProfile)
router.get( '/profile/edit', protect, updateUserProfileForm )
router.delete( '/delete', protect, deleteUser )
router.route('/legacy').get(legacyAccountCreate).post(legacyAccountCreate)

module.exports = router