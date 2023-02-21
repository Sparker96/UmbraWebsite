const Sequelize = require('sequelize')
const db = require('./db')

const Test = db.define('test', {
  name: Sequelize.STRING,
  bio: Sequelize.TEXT,
  imageUrl: Sequelize.STRING
})

module.exports = Test
