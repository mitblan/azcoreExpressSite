// const Sequelize = require('sequelize')
import { Sequelize } from "sequelize"
// const sequelize = require( '../utils/database' ).site
import { site } from '../utils/database.js'
import bcrypt from 'bcrypt'

const User = site.define( 'user', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    lenght: 32,
    unique: true,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  password: {
    type: Sequelize.STRING,
    set( value ) {
      const salt = bcrypt.genSaltSync(10)
      const hash = bcrypt.hashSync( value, salt )
      this.setDataValue('password', hash)
    }
  },
  account_id: {
    type: Sequelize.INTEGER,
  },
} )

User.prototype.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}



export default User