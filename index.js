// This is the main entry point for the website. This version of the website will be ran using express and node
// If this version is successful I will start working on an api version.
// This is being written for those that would like a website for their azerothcore server.

// requirements: requirements will be listed {coreModules: first, npmInstalledModules: second, customMiddleware: thrid, other: fourth}

// const path = require( 'path' )
import path from 'path'

// const express = require('express')
import express from 'express'
// require('dotenv').config()
import dotenv from 'dotenv'
dotenv.config()
import cookieParser from 'cookie-parser'
// const ejsMate = require( 'ejs-mate' )
import ejsMate from 'ejs-mate'
// const asyncHandler = require('express-async-handler')
import AsyncHandler from 'express-async-handler'

// const {auth, chars, world, site} = require( './utils/database' )
import {auth, chars, world, site} from './utils/database.js'
// const races = require('./utils/race.js')
import races from './utils/race.js'
// const classes = require('./utils/class')
import classes from './utils/class.js'

// const Character = require('./models/characters')
import Character from './models/characters.js'
// const Account = require( './models/accounts' )
import Account from './models/accounts.js'
// const User = require('./models/userModel')
import User from './models/userModel.js'

// const accountRoutes = require( './routes/accountRoutes' )
import accountRoutes from './routes/accountRoutes.js'
// const userRoutes = require('./routes/userRoutes')
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 5000
const __dirname = path.resolve(path.dirname(new URL(import.meta.url).pathname))
const publicPath = path.join(__dirname, 'public')
const viewPath = path.join(__dirname, 'views')

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', viewPath)
app.use(express.static(publicPath))

app.use( express.urlencoded( { extended: true } ) )

app.use(cookieParser())

app.use('/user', userRoutes)

app.use('/account', accountRoutes)

app.get('/', async (req, res) => {
	const chars = await Character.findAll()
	const acc = await Account.findAll()
	res.render('home', { chars, acc, races, classes })
	// res.render('home')
} )


	// auth.sync().then( result => {
	// 	// console.log(result)
	// })
	// chars.sync().then( result => {
	// 	// console.log(result)
	// }).then( result => {
	// 	// console.log(result)
	// })
	// world.sync().then( result => {
	// 	// console.log(result)
	// } )
	// site.sync({alter: true}).then( result => {
	// 	// console.log(result)
	// })

app.listen( port, () => {
		console.log(`Server running on port: ${port}`)
	})
// app.listen( port, () => {
// 	console.log(`Server running on port: ${port}`)
// })

