module.exports = (sequelize, seq) => {
  return sequelize.define('user', {
      id: {
        type: seq.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: seq.STRING,
      uuid: {
        type: seq.UUID,
        defaultValue: seq.UUIDV4 // Or Sequelize.UUIDV1
      }
  })
}