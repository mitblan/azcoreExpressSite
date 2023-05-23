// const crypto = require( 'crypto' )
import crypto from 'node:crypto'
// const { computeVerifier, params } = require( '@azerothcore/ac-nodejs-srp6' )
import { computeVerifier, params } from '@azerothcore/ac-nodejs-srp6'
// const Account = require( './models/accounts' )
import Account from './models/accounts.js'
import User from './models/userModel.js'
import { site } from './utils/database.js'

const username = 'Test'
const password = 'Test'
const email = 'testing@email.com'
const account = 1

const salt = crypto.randomBytes( 32 )

// const makeAcc = async () => {
//   const verifier = await computeVerifier( params.constants, salt, username.toUpperCase(), password.toUpperCase() )
//   const user = await Account.create( { username, salt, verifier, email } )
//   user.save()
//   console.log(user)
// }


// const makeAcc = async () => {
//   try {
//     const user = await User.create( { username: 'mitblan', email: 'mitblan@gmail.com', password: 'thejustice', account_id: 1 } )
//     console.log(user)
//   } catch (e) {
//     console.log(e)
//   }
  
// }

const makeAcc = async () => {
  const user = await User.update( { password: 'testing', username: 'pathdond' }, {
    where: {
      username: 'pathdond1'
    }
  } )
  console.log(user)
}


makeAcc()