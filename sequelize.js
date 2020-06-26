const Sequelize = require('sequelize')
const UserModel = require('./src/models/user')
const BlogModel = require('./src/models/blog')
const TagModel = require('./src/models/tag')
const ImagesModel = require('./src/models/images')
const debug = require('debug')('app:sequelize')

const sequelize = new Sequelize('mydb', 'root', '',{
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

const User = UserModel(sequelize, Sequelize)
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