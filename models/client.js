"use strict";
module.exports = (sequelize, DataTypes) => {
  const Client = sequelize.define(
    "Client",
    {
      ci: DataTypes.STRING,
      fullName: DataTypes.STRING,
      address: DataTypes.STRING,
      cellPhone: DataTypes.STRING,
      email: DataTypes.STRING,
      type: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  Client.associate = function(models) {
    Client.hasMany(models.Appointment, {
      foreignKey: "clientId",
      as: "appointments"
    });
  };
  return Client;
};
