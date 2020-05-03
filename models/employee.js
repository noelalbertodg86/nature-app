"use strict";
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define(
    "Employee",
    {
      fullName: DataTypes.STRING,
      title: DataTypes.STRING,
      phone: DataTypes.STRING,
      placeId: DataTypes.INTEGER
    },
    {}
  );
  Employee.associate = function(models) {
    Employee.belongsTo(models.Place, {
      foreignKey: "placeId",
      as: "place"
    });
  };
  return Employee;
};
