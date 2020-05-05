"use strict";
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define(
    "Message",
    {
      canal: DataTypes.STRING,
      type: DataTypes.STRING,
      message: DataTypes.STRING,
      subject: DataTypes.STRING
    },
    {}
  );
  Message.associate = function(models) {
    // associations can be defined here
  };
  return Message;
};
