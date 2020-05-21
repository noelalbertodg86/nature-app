"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("PromotionMessageQueques", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      promotionId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Promotions",
          key: "id"
        }
      },
      status: {
        type: Sequelize.STRING(20)
      },
      result: {
        type: Sequelize.STRING(50)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("PromotionMessageQueques");
  }
};