"use strict";
module.exports = (sequelize, DataTypes) => {
  const PromotionClient = sequelize.define(
    "PromotionClient",
    {
      status: DataTypes.STRING,
      result: DataTypes.STRING,
      promotionId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER
    },
    {}
  );
  PromotionClient.associate = function(models) {
    // associations can be defined here
    PromotionClient.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client"
    });

    PromotionClient.belongsTo(models.Promotion, {
      foreignKey: "promotionId",
      as: "promotion"
    });
  };
  return PromotionClient;
};
