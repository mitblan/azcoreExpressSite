const { uptimeCalculation, dateFromTimestamp } = require( '../utils/utility' )
const request = require('request')
const Uptime = require( '../models/uptimeModel' )
const Character = require('../models/characterModel')
const Post = require( '../models/blogModel' )
const User = require('../models/userModel')

// desc: Home route
// @route: GET /
// @access: Public
const home = ( '/', async ( req, res ) => {
  console.log(req.user)
  const uptime = await Uptime.findOne( {
    where: {},
    order: [['starttime', 'DESC']]
  } )

  const newPosts = await Post.findAll( {
    where: {
      published: true,
    },
    limit: 5,
    order: [
      ['updatedAt', 'DESC']
    ],
    include: User
  } )

  const getDiscord = async () => {
    return fetch('https://discord.com/api/guilds/373216226815508481/widget.json').then(response => response.json())
  }
  
  const discord = await getDiscord()

  let { count } = await Character.findAndCountAll( { where: { online: 1 } } )
  const status = uptimeCalculation( uptime.uptime )
  const startTime = dateFromTimestamp( uptime.starttime )
  res.render('index/home', {status, count, startTime, newPosts, newPosts, discord})
} )

module.exports = {
  home
}