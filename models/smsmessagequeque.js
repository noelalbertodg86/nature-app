"use strict";
module.exports = (sequelize, DataTypes) => {
  const SmsMessageQueque = sequelize.define(
    "SmsMessageQueque",
    {
      destinationNumber: DataTypes.STRING,
      body: DataTypes.STRING,
      status: DataTypes.STRING,
      result: DataTypes.STRING
    },
    {}
  );
  SmsMessageQueque.associate = function(models) {
    // associations can be defined here
  };
  return SmsMessageQueque;
};
