const express = require('express')
const asyncHandler = require('express-async-handler')
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

module.exports = router
