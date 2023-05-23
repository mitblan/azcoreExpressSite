// const Sequelize = require('sequelize')
import { Sequelize } from "sequelize"
// const sequelize = require('../utils/database').chars
import {chars} from '../utils/database.js'

const Character = chars.define(
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

export default Character
