module.exports = (sequelize, type) => {
  const Appointment = sequelize.define(
    "Appointment",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      date: type.DATE,
      state: {
        type: type.STRING(10),
        defaultValue: "PENDING"
      },
      segmentId: type.INTEGER,
      placeId: type.INTEGER,
      employeeId: type.INTEGER,
      serviceId: type.INTEGER,
      clientId: {
        type: type.STRING(15),
        allowNull: true,
        foreignKey: true,
        references: {
          model: "Clients",
          key: "id"
        }
      }
    },
    {
      // options
    }
  );
  Appointment.associate = function(models) {
    Appointment.belongsTo(models.TimeSegment, { foreignKey: "segmentId" });
    Appointment.belongsTo(models.Place, { foreignKey: "placeId" });
    Appointment.belongsTo(models.Employee, { foreignKey: "employeeId" });
    Appointment.belongsTo(models.Service, { foreignKey: "serviceId" });
    Appointment.belongsTo(models.Client, {
      foreignKey: "clientId",
      as: "client"
    });
  };

  return Appointment;
};
