const Sequelize = require('sequelize')
const sequelize = require('../utils/database').chars

const Character = sequelize.define(
	'characters',
	{
		guid: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true,
		},
		account: {
			type: Sequelize.INTEGER,
		},
		name: {
			type: Sequelize.STRING,
		},
		race: {
			type: Sequelize.INTEGER,
		},
		class: {
			type: Sequelize.INTEGER,
		},
		gender: {
			type: Sequelize.INTEGER,
		},
		level: {
			type: Sequelize.INTEGER,
		},
		xp: {
			type: Sequelize.INTEGER,
		},
		money: {
			type: Sequelize.INTEGER,
		},
		online: {
			type: Sequelize.INTEGER,
		},
		totaltime: {
			type: Sequelize.INTEGER,
		},
		totalKills: {
			type: Sequelize.INTEGER,
		},
	},
	{
		timestamps: false,
	}
)

module.exports = Character
