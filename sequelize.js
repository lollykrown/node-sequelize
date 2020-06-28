const Sequelize = require('sequelize')
const UserModel = require('./src/models/user')
const BlogModel = require('./src/models/blog')
const TagModel = require('./src/models/tag')
const ImagesModel = require('./src/models/images')
const debug = require('debug')('app:sequelize')

const {DataTypes} = require('sequelize')

// //Using raw query to create database for the first time
// //create the sequelize instance, omitting the database-name arg
// const sequelize = new Sequelize("", "root", "", {
//   dialect: "mysql"
// });

// return sequelize.query("CREATE DATABASE `nodeSequelizeDb`;").then(data => {
//   debug('database created')
// });

const sequelize = new Sequelize('nodeSequelizeDb', 'root', '',{
  host: 'localhost',
  dialect: 'mysql',
  port: '3306',
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

const User = UserModel(sequelize, DataTypes)
// BlogTag will be our way of tracking relationship between Blog and Tag models
// each Blog can have multiple tags and each Tag can have multiple blogs
const BlogTag = sequelize.define('blog_tag', {})
const Blog = BlogModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)
const Image = ImagesModel(sequelize, Sequelize)

Blog.belongsToMany(Tag, { through: BlogTag, unique: false })
Tag.belongsToMany(Blog, { through: BlogTag, unique: false })
Blog.belongsTo(User);

sequelize.sync({ force: true })
  .then(() => {
    debug(`Database & tables created!`)
  })

module.exports = {
  User,
  Blog,
  Tag,
  Image
}