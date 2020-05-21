"use strict";
module.exports = (sequelize, DataTypes) => {
  const EmailMessageQueque = sequelize.define(
    "EmailMessageQueque",
    {
      from: DataTypes.STRING,
      to: DataTypes.STRING,
      subject: DataTypes.STRING,
      body: DataTypes.STRING,
      status: DataTypes.STRING,
      result: DataTypes.STRING
    },
    {}
  );
  EmailMessageQueque.associate = function(models) {
    // associations can be defined here
  };
  return EmailMessageQueque;
};
