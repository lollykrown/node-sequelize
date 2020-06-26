const Sequelize = require('sequelize')
const UserModel = require('./src/routes/models/user')
const BlogModel = require('./src/routes/models/blog')
const TagModel = require('./src/routes/models/tag')
const ImagesModel = require('./src/routes/models/images')
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
  // dialectOptions: {
  //   socketPath: '.var/run/mysqld/mysqld.sock'
  // },
  // define: {
  //   paranoid: true
  // }
})

// try {
//   await sequelize.authenticate();
//   debug('Connection has been established successfully.');
// } catch (error) {
//   console.error('Unable to connect to the database:', error);
// }


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
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Blog,
  Tag,
  Image
}