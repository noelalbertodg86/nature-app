module.exports = (sequelize, type) => {
  return sequelize.define(
    "TimeSegment",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // attributes
      segment: {
        type: type.TIME,
        allowNull: false
      }
    },
    {
      // options
    }
  );
};
