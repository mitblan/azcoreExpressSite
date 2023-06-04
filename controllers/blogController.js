const asyncHandler = require( 'express-async-handler' )
const User = require( '../models/userModel' )
const Post = require( '../models/blogModel' )

Post.belongsTo( User )
User.hasMany(Post)

// @desc: Blog index, Lists all blog posts
// @route: /
// @access: Public
const getPosts = asyncHandler( async ( req, res ) => {
  const posts = await Post.findAll( {
    where: {
      published: true
    },
    include: User
  } )
  
  if ( posts ) {
    res.render('posts/index', {posts})
  } else {
    res.send('Something went wrong.')
  }
} )

const newPost = ( req, res ) => {
  res.render('posts/new')
}

const createPost = asyncHandler( async ( req, res ) => {
  const { title, body, published } = req.body
  console.log(req.body)
  const userId = req.user.id
  let isPublished = !published ? false : true

  const newPost = await Post.create( { title, body, published: isPublished, userId } )
  
  res.redirect(`blog/${newPost.id}`)
} )

const viewPost = asyncHandler( async ( req, res ) => {
  const post = await Post.findOne( {
    where: {
      id: req.params.id
    },
    include: User
  } )

  console.log(post.published)
  
  if ( !post || post.published === false && !req.user) {
    req.session.returnTo = req.originalUrl
    res.redirect('/user/login')
  } else {
    res.render('posts/view', {post})
  }
  
})

module.exports = {getPosts, newPost, createPost, viewPost}