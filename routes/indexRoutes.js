const express = require( 'express' )
const { protect } = require( '../middleware/protect' )
const {home} = require('../controllers/rootController')
const router = express.Router()

router.get( '/', home)


module.exports = router