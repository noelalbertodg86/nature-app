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
  };
  return Appointment;
};
