const Sequelize = require("sequelize");
PlaceModel = require("./models/place");

const sequelizeConnection = new Sequelize("nature-app", "root", "root", {
  host: "localhost",
  port: 3306,
  dialect: "mysql"
});

sequelizeConnection
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

const Place = PlaceModel(sequelizeConnection, Sequelize);

sequelizeConnection
  .sync({ alter: true })
  .then(() => console.log("Database is update"))
  .catch(err => {
    console.error(err);
  });

module.exports = { Place };
