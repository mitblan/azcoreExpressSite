const { getPosts, newPost, createPost, viewPost } = require( '../controllers/blogController' )
const express = require( 'express' )
const {protect} = require('../middleware/protect')

const router = express.Router()

router.route('/').get( getPosts ).post( protect, createPost)
router.get( '/new', protect, newPost )
router.get('/:id', viewPost)

module.exports = router