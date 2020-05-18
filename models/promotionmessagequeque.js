'use strict';
module.exports = (sequelize, DataTypes) => {
  const PromotionMessageQueque = sequelize.define('PromotionMessageQueque', {
    type: DataTypes.STRING,
    canal: DataTypes.STRING,
    status: DataTypes.STRING,
    result: DataTypes.STRING,
    body: DataTypes.STRING
  }, {});
  PromotionMessageQueque.associate = function(models) {
    // associations can be defined here
  };
  return PromotionMessageQueque;
};