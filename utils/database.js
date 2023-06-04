const Sequelize = require( 'sequelize' )
const dotenv = require('dotenv').config()

const auth = new Sequelize(process.env.AUTH_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
})

const chars = new Sequelize(process.env.CHAR_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
})

const world = new Sequelize(process.env.WORLD_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: process.env.DB_HOST,
} )

const site = new Sequelize( process.env.SITE_DB, process.env.DB_USER, process.env.DB_PASS, {
	dialect: 'mysql',
	host: 'localhost'
})

module.exports = {
	auth,
	chars,
	world,
	site
}
