const Sequelize = require('sequelize')
const sequelize = require('../utils/database').auth

const Account = sequelize.define(
	'account',
	{
		id: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		username: {
			type: Sequelize.STRING,
			length: 32,
			unique: true,
			allowNull: false,
		},
		salt: {
			type: Sequelize.STRING,
			binary: true,
			lenght: 32,
			allowNull: false,
		},
		verifier: {
			type: Sequelize.STRING,
			binary: true,
			length: 32,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		online: {
			type: Sequelize.INTEGER,
			allowNull: false,
			default: 0,
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
)

module.exports = Account
