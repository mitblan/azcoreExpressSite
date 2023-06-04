const Sequelize = require('sequelize')
const site = require( '../utils/database' ).site

const Post = site.define( 'post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  published: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    default: false,
  },
} )

module.exports = Post