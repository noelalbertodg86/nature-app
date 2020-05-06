"use strict";
module.exports = (sequelize, DataTypes) => {
  const AppointmentMessageQueue = sequelize.define(
    "AppointmentMessageQueue",
    {
      appointmentId: DataTypes.INTEGER,
      type: DataTypes.STRING,
      canal: DataTypes.STRING,
      status: DataTypes.STRING,
      result: DataTypes.STRING
    },
    {}
  );
  AppointmentMessageQueue.associate = function(models) {
    AppointmentMessageQueue.belongsTo(models.Appointment, {
      foreignKey: "appointmentId",
      as: "appointment"
    });
  };
  return AppointmentMessageQueue;
};
