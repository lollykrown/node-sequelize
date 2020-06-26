module.exports = (sequelize, type) => {
  return sequelize.define('image', {
      type: {
        type: type.STRING,
      },
      name: {
        type: type.STRING
      },
      data: {
        type: type.BLOB('long')
      }
  })
}