"use strict";
module.exports = (sequelize, DataTypes) => {
  const Promotion = sequelize.define(
    "Promotion",
    {
      type: DataTypes.STRING,
      canal: DataTypes.STRING,
      body: DataTypes.TEXT("long"),
      status: DataTypes.STRING
    },
    {}
  );
  Promotion.associate = function(models) {
    // associations can be defined here
  };
  return Promotion;
};
