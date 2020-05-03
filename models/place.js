//"use strict";
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define(
    "Place",
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  Place.associate = function(models) {
    // associations can be defined here
    Place.hasMany(models.Appointment, {
      foreignKey: "placeId",
      as: "appointments"
    });
    Place.hasMany(models.Employee, {
      foreignKey: "placeId",
      as: "employees"
    });
  };
  return Place;
};
