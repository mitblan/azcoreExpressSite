const crypto = require( 'crypto' )
const { computeVerifier, params } = require( '@azerothcore/ac-nodejs-srp6' )
const Account = require( './models/accounts' )

const username = 'Test'
const password = 'Test'
const email = 'testing@email.com'

const salt = crypto.randomBytes( 32 )

const makeAcc = async () => {
  const verifier = await computeVerifier( params.constants, salt, username.toUpperCase(), password.toUpperCase() )
  const user = await Account.create( { username, salt, verifier, email } )
  user.save()
  console.log(user)
}


makeAcc()