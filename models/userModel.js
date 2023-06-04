const Sequelize = require('sequelize')
const site = require( '../utils/database' ).site
const bcrypt = require('bcrypt')

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


module.exports = User