// const crypto = require('crypto')
import crypto from 'crypto'
// const express = require( 'express' )
import express from 'express'
// const {Op} = require('sequelize')
import { Op } from 'sequelize'
// const asyncHandler = require( 'express-async-handler' )
import asyncHandler from 'express-async-handler'
// const {computeVerifier, params} = require('@azerothcore/ac-nodejs-srp6')
import { computeVerifier, params } from '@azerothcore/ac-nodejs-srp6'
// const Account = require('../models/accounts')
import Account from '../models/accounts.js'
// const Characters = require('../models/characters')
import Characters from '../models/characters.js'
// const race = require('../utils/race')
import race from '../utils/race.js'
// const classes = require('../utils/class')
import classes from '../utils/class.js'

const router = express.Router()

router.get(
	'/:id/characters',
	asyncHandler(async (req, res) => {
		const acc = await Account.findByPk(req.params.id)

		console.log(acc.username)

		if (!acc) {
			res.send('Could not find that account')
		}

		const chars = await Characters.findAll({
			where: {
				account: acc.id,
			},
		})

		res.render('account/characters', { acc, chars, race, classes })
	})
)

router.get( '/new', ( req, res ) => {
	res.render('account/form')
})

router.post( '/', asyncHandler( async ( req, res ) => {
	const { email, username, password, confirmPassword, } = req.body
	const salt = crypto.randomBytes(32)
	
	
	if ( !password === confirmPassword ) {
		res.send('Passwords do not match')
	}

	const existingUser = await Account.findOne( {
		where: {
			[ Op.or ]: [
				{ username },
				{email}
			] }})
		
	if ( existingUser ) {
		res.send('Username or Email already exists')
	}

	const verifier = await computeVerifier( params.constants, salt, username.toUpperCase(), password.toUpperCase() )

	const user = await Account.create( { username, salt, verifier, email, reg_mail: email } )

	if ( !user ) {
		res.send('Something went wrong.')
	}

	res.redirect( `/account/${ user.id }/characters` )
	

}))

export default router
