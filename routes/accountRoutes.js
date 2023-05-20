const crypto = require('crypto')
const express = require( 'express' )
const {Op} = require('sequelize')
const asyncHandler = require( 'express-async-handler' )
const {computeVerifier, params} = require('@azerothcore/ac-nodejs-srp6')
const Account = require('../models/accounts')
const Characters = require('../models/characters')
const race = require('../utils/race')
const classes = require('../utils/class')

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

module.exports = router
