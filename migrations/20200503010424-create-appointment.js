"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Appointments", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.DATE
      },
      state: {
        type: Sequelize.STRING(15)
      },
      segmentId: {
        type: Sequelize.INTEGER
      },
      placeId: {
        type: Sequelize.INTEGER
      },
      employeeId: {
        type: Sequelize.INTEGER
      },
      serviceId: {
        type: Sequelize.INTEGER
      },
      clientId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable("Appointments");
  }
};
