"use strict";
module.exports = (sequelize, DataTypes) => {
  const Service = sequelize.define(
    "Service",
    {
      name: DataTypes.STRING,
      price: DataTypes.DECIMAL
    },
    {}
  );
  Service.associate = function(models) {
    // associations can be defined here
  };
  return Service;
};
