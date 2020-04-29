module.exports = (sequelize, type) => {
  return sequelize.define(
    "Service",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // attributes
      name: {
        type: type.STRING,
        allowNull: false
      },
      price: {
        type: type.DECIMAL,
        allowNull: true
      }
    },
    {
      // options
    }
  );
};
