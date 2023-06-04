const User = require( '../models/userModel' )
const bcrypt = require( 'bcrypt' )
const LocalStrategy = require( 'passport-local' )

module.exports = function ( passport ) {
  // Passport authentication strategy
  passport.use( new LocalStrategy( {
    usernameField: 'email'
  },async( email, password, callBack ) => {
    const user = await User.findOne( {
    where: {
      email
    }
  } )
  if ( user && (await user.matchPassword(password)) ) {
    return callBack(null, user)
  }
    return callBack(null, false, {message: 'Incorrect email or password'})
} ) )

passport.serializeUser( ( user, callBack ) => {
  process.nextTick( () => {
    callBack(null, {id: user.id, email: user.email, username: user.username, accId: user.account_id})
  })
} )

passport.deserializeUser( (user, callBack) => {
  process.nextTick( () => {
    return callBack(null, user)
  })
})
}