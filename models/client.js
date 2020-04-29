module.exports = (sequelize, type) => {
  return sequelize.define(
    "Client",
    {
      id: {
        type: type.STRING(15),
        primaryKey: true
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
      address: type.STRING,
      cellPhone: type.STRING,
      email: type.STRING,
      type: type.STRING(10),
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
