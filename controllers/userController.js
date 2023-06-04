const asyncHandler = require( 'express-async-handler' )
const crypto = require('node:crypto')
const { Op } = require( 'sequelize' )
const { computeVerifier, params } = require( '@azerothcore/ac-nodejs-srp6' )
const passport = require( 'passport' )
const User = require( '../models/userModel' )
const Account = require('../models/accountModel')
const Character = require( '../models/characterModel' )
const { charClass, charRace } = require( '../utils/utility' )


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
  if ( req.method === 'GET' ) {
    res.status(200).render('user/register')
  }
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
    res.status(201).redirect('/user/profile')
  } else {
    res.status( 400 )
    throw new Error('There was an error creating you account.')
  }
  }
  
  

} )

// @desc:   Logout, logout user and destroy token and cookie
// @route:  POST /user/logout
// @access: Private
const logoutUser = asyncHandler( async ( req, res ) => {
  req.logout( () => {
    res.status(200).redirect('/')
  })
  
} )
  
// @desc:   Profile, get's logged in user's profile and server account information
// @route:  GET /user/profile
// @access: Private
const getProfile = asyncHandler( async ( req, res ) => {
  const user = await User.findByPk(req.user.id)
  const accId = user.account_id

  const acc = await Account.findByPk( accId )
  const chars = await Character.findAll( {
    where: {
      account: accId
    }
  } )
  res.status(200).render('user/profile',{user: req.user, acc, chars, race: charRace, classes: charClass})
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

const legacyAccountCreate = asyncHandler( async ( req, res ) => {
  if ( req.method == 'GET' ) {
    res.render('user/legacy')
  }

  const { username, password, email } = req.body
  const existingAcc = await Account.findOne( {
    where: {
      username
    }
  } )
  
  if ( !existingAcc ) {
    res.render('/user/legacy')
  }

  const verifier = await computeVerifier( params.constants, existingAcc.salt, username.toUpperCase(), password.toUpperCase() )

  if ( !existingAcc.verifier === verifier ) {
    res.render('/user/legacy')    
  }

  let userExists = await User.findOne( {
      where: {
        [ Op.or ]: [
          { username },
          {email}
        ]
      }
  } )
  
  if ( userExists ) {
    res.render('/user/legacy')
  }

  const user = await User.create( { email, username, password, account_id: existingAcc.id } )
  const acc = await Account.update( { email, reg_mail: email }, {
    where: {
      id: existingAcc.id
    }
  } )
  
  if ( !user || !acc ) {
    res.render('/user/legacy')
  }

  res.redirect('/user/profile')

})

module.exports = {
  loginUserForm,
  registerUser,
  logoutUser,
  getProfile,
  updateUserProfile,
  updateUserProfileForm,
  deleteUser,
  legacyAccountCreate
}