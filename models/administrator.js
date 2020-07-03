'use strict';
module.exports = (sequelize, DataTypes) => {
  const Administrator = sequelize.define('Administrator', {
    email: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    cellPhone: DataTypes.STRING
  }, {});
  Administrator.associate = function(models) {
    // associations can be defined here
  };
  return Administrator;
};