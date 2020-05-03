"use strict";
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      fullName: DataTypes.STRING,
      title: DataTypes.STRING,
      phone: DataTypes.STRING
    },
    {}
  );
  Employee.associate = function(models) {
    // associations can be defined here
  };
  return Employee;
};
