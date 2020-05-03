module.exports = (sequelize, type) => {
  const Place = sequelize.define(
    "Place",
    {
      id: {
        type: type.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // attributes
      name: {
        type: type.STRING,
        allowNull: false
      },
      address: type.STRING,
      phone: {
        type: type.STRING,
        allowNull: true
      }
    },
    {
      // options
    }
  );
  Place.associate = function(models) {
    Place.hasMany(models.Appointment, {
      foreignKey: "placeId",
      as: "places"
    });
  };

  return Place;
};
