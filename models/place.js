module.exports = (sequelize, type) => {
  return sequelize.define(
    "Place",
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
      address: type.STRING,
      phone: {
        type: type.STRING,
        allowNull: true
      }
    },
    {
      // options
    }
  );
};
