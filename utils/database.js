const Sequelize = require('sequelize')

const auth = new Sequelize('acore_auth', 'acore', 'acore', {
	dialect: 'mysql',
	host: 'localhost',
})

const chars = new Sequelize('acore_characters', 'acore', 'acore', {
	dialect: 'mysql',
	host: 'localhost',
})

const world = new Sequelize('acore_world', 'acore', 'acore', {
	dialect: 'mysql',
	host: 'localhost',
})

module.exports = {
	auth,
	chars,
	world,
}
