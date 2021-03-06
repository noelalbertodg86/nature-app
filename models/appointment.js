"use strict";
module.exports = (sequelize, DataTypes) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      date: DataTypes.DATE,
      state: DataTypes.STRING,
      segmentId: DataTypes.INTEGER,
      placeId: DataTypes.INTEGER,
      employeeId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
      clientId: DataTypes.INTEGER
    },
    {}
  );
  Appointment.associate = function(models) {
    // associations can be defined here
    Appointment.belongsTo(models.Place, {
      foreignKey: "placeId",
      as: "place"
    });
    Appointment.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client"
    });
    Appointment.belongsTo(models.TimeSegment, {
      foreignKey: "segmentId",
      as: "timeSegment"
    });
    Appointment.hasMany(models.AppointmentMessageQueue, {
      foreignKey: "appointmentId",
      as: "AppointmentMessageQueue"
    });
  };
  return Appointment;
};
