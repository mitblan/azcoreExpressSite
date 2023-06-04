// This is the main entry point for the website. This version of the website will be ran using express and node
// If this version is successful I will start working on an api version.
// This is being written for those that would like a website for their azerothcore server.

// requirements: requirements will be listed {coreModules: first, npmInstalledModules: second, customMiddleware: thrid, other: fourth}

const path = require('path')

const express = require('express')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
const ejsMate = require('ejs-mate')
const createError = require('http-errors')
const logger = require('morgan')
const passport = require( 'passport' )
const session = require( 'express-session' )
const flash = require( 'connect-flash' )

const {site} = require('./utils/database')

const userRoutes = require( './routes/userRoutes' )
const indexRoutes = require( './routes/indexRoutes' )
const blogRoutes = require('./routes/blogRoutes')

const port = process.env.PORT || 5000
const publicPath = path.join(__dirname, 'public')
const viewPath = path.join(__dirname, 'views')

const app = express()

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', viewPath)

app.use( express.static( publicPath ) )
app.use( express.urlencoded( { extended: true } ) )
app.use( logger( 'dev' ) )
app.use( flash() )
app.use( session( {
	secret: process.env.APP_SECRET,
	resave: false,
	saveUninitialized: false
} ) )
app.use( cookieParser(process.env.APP_SECRET) )

app.use(passport.authenticate('session'))
require('./config/passportConfig')(passport)

app.use('/', indexRoutes)
app.use( '/user', userRoutes )
app.use('/blog', blogRoutes)

// const Post = require( './models/blogModel' )
// const User = require( './models/userModel' )

// User.hasMany( Post )
// Post.belongsTo(User)

// Post.sync({alter: true})


app.listen( port, () => {
		console.log(`Server running on port: ${port}`)
	})

