const asyncHandler = require('express-async-handler')
const Account = require('../models/accounts')
const Characters = require('../models/characters')

// @desc: Get a list of character for a specific account
// @route: Get /account/:id/chars
// @access: Private
const getCharacters = asyncHandler(async (req, res) => {
	const acc = await Account.findAll({
		where: {
			id: req.body.params.id,
		},
	})

	if (!acc) {
		res.send('Could not find that account')
	}

	const char = await Characters.findAll({
		where: {
			account: acc.id,
		},
	})

	res.render('account/characters', { char })
})

module.exports = getCharacters
