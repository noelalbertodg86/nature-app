module.exports = (sequelize, type) => {
  return sequelize.define(
    "Employee",
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
      lastName: {
        type: type.STRING,
        allowNull: true
      },
      degree: type.STRING,
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