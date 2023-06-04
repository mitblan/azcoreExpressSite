const Sequelize = require( 'sequelize' )
const { auth } = require( '../utils/database' )

const Uptime = auth.define(
  'uptime',
  {
    starttime: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    uptime: {
      type: Sequelize.INTEGER,
      allowNull: false,      
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = Uptime