"use strict";
module.exports = (sequelize, DataTypes) => {
  const TimeSegment = sequelize.define(
    "TimeSegment",
    {
      segment: DataTypes.TIME
    },
    {}
  );
  TimeSegment.associate = function(models) {
    // associations can be defined here
  };
  return TimeSegment;
};
