const { DataTypes } = require("sequelize/types")

module.exports = (sequelize, type) => {
  return sequelize.define('user', {
      type: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING
      },
      data: {
        type: DataTypes.BLOB('long')
      }
  })
}