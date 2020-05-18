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
      type: {
        type: Sequelize.STRING(20)
      },
      canal: {
        type: Sequelize.STRING(20)
      },
      status: {
        type: Sequelize.STRING(20)
      },
      result: {
        type: Sequelize.STRING(50)
      },
      body: {
        type: Sequelize.STRING(4000)
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
