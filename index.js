// This is the main entry point for the website. This version of the website will be ran using express and node
// If this version is successful I will start working on an api version.
// This is being written for those that would like a website for their azerothcore server.

// requirements: requirements will be listed {coreModules: first, npmInstalledModules: second, customMiddleware: thrid, other: fourth}

const path = require('path')

const express = require('express')
require('dotenv').config()
const ejsMate = require('ejs-mate')

const races = require('./utils/race.js')
const classes = require('./utils/class')

const Character = require('./models/characters')
const Account = require('./models/accounts')

const accountRoutes = require('./routes/accountRoutes')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, 'public')
const viewPath = path.join(__dirname, 'views')

app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', viewPath)
app.use(express.static(publicPath))

app.use(express.urlencoded({ extended: true }))

app.use('/account', accountRoutes)

app.get('/', async (req, res) => {
	const chars = await Character.findAll()
	const acc = await Account.findAll()
	res.render('home', { chars, acc, races, classes })
	// res.render('home')
})

app.listen(port, () => {
	console.log(`Server running on port: ${port}`)
})
