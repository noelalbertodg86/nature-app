"use strict";
module.exports = (sequelize, DataTypes) => {
  const PromotionMessageQueque = sequelize.define(
    "PromotionMessageQueque",
    {
      status: DataTypes.STRING,
      result: DataTypes.STRING,
      promotionId: DataTypes.INTEGER
    },
    {}
  );
  PromotionMessageQueque.associate = function(models) {
    PromotionMessageQueque.belongsTo(models.Promotion, {
      foreignKey: "promotionId",
      as: "promotion"
    });
  };
  return PromotionMessageQueque;
};
