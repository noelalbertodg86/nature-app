module.exports = (sequelize, type) => {
  const Client = sequelize.define(
    "Client",
    {
      id: {
        type: type.STRING(15),
        primaryKey: true
      },
      // attributes
      fullName: {
        type: type.STRING,
        allowNull: false
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

  Client.associate = function(models) {
    Client.hasMany(models.Appointment, { as: "appointment" });
  };
  return Client;
};
