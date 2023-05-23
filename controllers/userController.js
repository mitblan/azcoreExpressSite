// const asyncHandler = require( 'express-async-handler' )
import asyncHandler from 'express-async-handler'
import crypto from 'node:crypto'
import { Op } from 'sequelize'
import { computeVerifier, params } from '@azerothcore/ac-nodejs-srp6'
import generateToken from '../utils/generateToken.js'
import User from '../models/userModel.js'
import Account from '../models/accounts.js'
import Character from '../models/characters.js'
import race from '../utils/race.js'
import classes from '../utils/class.js'

// @desc:   Login, set token
// @route:  POST /user/login
// @access: Public
const loginUser = asyncHandler( async ( req, res ) => {
  const { email, password } = req.body
  
  const user = await User.findOne( {
    where: {
      [ Op.or ]: [
        {email}
      ]
    }
  } )
  const result = await user.matchPassword(password)
  console.log(result)
  
  if ( user && (await user.matchPassword(password))) {
      generateToken(res, user.id)
    res.status( 201 ).redirect( '/user/profile' )
    console.log(user)
  } else {
    res.status( 401 )
    throw new Error('Invalid email or password.')
  }

} )

// @desc:   Login, Show login form
// @route:  Get /user/login
// @access: Public
const loginUserForm = asyncHandler( async ( req, res ) => {
  res.render('user/login')
} )  

// @desc:   Register, create a new user account on site and in game and link them
// @route:  POST /user/register
// @access: Public
const registerUser = asyncHandler( async ( req, res ) => {
  const { email, username, password, confirmPassword } = req.body

  const salt = crypto.randomBytes(32)
  
  let userExists = await User.findOne( {
    where: {
      [ Op.or ]: [
        { username },
        {email}
      ]
    }
  } )

  if ( !userExists ) {
    userExists = await Account.findOne( {
      where: {
        [ Op.or ]: [
          { username },
          {reg_mail: email}
        ]
      }
    })
  }

  if ( userExists ) {
    res.status( 400 )
    throw new Error('Username or Email already exists.')
  }
  
  const verifier = await computeVerifier( params.constants, salt, username.toUpperCase(), password.toUpperCase() )

  const account = await Account.create( { username, salt, verifier, email, reg_mail: email } )
  

  if ( account ) {
    const user = await User.create( { email, username, password, account_id: account.id } )
    if ( user ) {
      generateToken(res, user.id)
    res.status(201).redirect('/user/profile')
  } else {
    res.status( 400 )
    throw new Error('There was an error creating you account.')
  }
  }
  
  

} )

// @desc:   Register, show register form
// @route:  Get /user/register
// @access: Public
const registerUserForm = asyncHandler( async ( req, res ) => {
  res.status(200).render('user/register')
} )  

// @desc:   Logout, logout user and destroy token and cookie
// @route:  POST /user/logout
// @access: Private
const logoutUser = asyncHandler( async ( req, res ) => {
  res.cookie( 'jwt', '', {
    httpOnly: true,
    expires: new Date(0)
  })
  res.status(200).redirect('/')
} )
  
// @desc:   Profile, get's logged in user's profile and server account information
// @route:  GET /user/profile
// @access: Private
const getProfile = asyncHandler( async ( req, res ) => {
  const accId = req.user.account_id 

  const acc = await Account.findByPk( accId )
  const chars = await Character.findAll( {
    where: {
      account: accId
    }
  })
  res.status(200).render('user/profile',{user: req.user, acc, chars, race, classes})
} )  

// @desc:   Update Profile, updates users profile and server account information
// @route:  PUT /user/profile
// @access: Private
const updateUserProfile = asyncHandler( async ( req, res ) => {
  res.status(200).send('Update User')
})  

// @desc:   Update Profile, user update form
// @route:  GET /user/profile/edit
// @access: Private
const updateUserProfileForm = asyncHandler( async ( req, res ) => {
  res.status(200).render('user/edit')
} )

// @desc:   Delete, delete user account and server account
// @route:  DELETE /user/delete
// @access: Private
const deleteUser = asyncHandler( async ( req, res ) => {
  res.status(200).render('user/delete')
} )

export {
  loginUser,
  loginUserForm,
  registerUser,
  registerUserForm,
  logoutUser,
  getProfile,
  updateUserProfile,
  updateUserProfileForm,
  deleteUser
}