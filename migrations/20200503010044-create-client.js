"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Clients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ci: {
        type: Sequelize.STRING(20)
      },
      fullName: {
        type: Sequelize.STRING
      },
      address: {
        type: Sequelize.STRING
      },
      cellPhone: {
        type: Sequelize.STRING(20)
      },
      email: {
        type: Sequelize.STRING
      },
      type: {
        type: Sequelize.STRING(10)
      },
      phone: {
        type: Sequelize.STRING(20)
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
    return queryInterface.dropTable("Clients");
  }
};
