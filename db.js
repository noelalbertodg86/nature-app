const Sequelize = require("sequelize");
PlaceModel = require("./models/place");
TimeSegmentModel = require("./models/timeSegment");
employeeModel = require("./models/employee");
serviceModel = require("./models/service");
clientModel = require("./models/client");

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
const TimeSegment = TimeSegmentModel(sequelizeConnection, Sequelize);
const Employee = employeeModel(sequelizeConnection, Sequelize);
const Service = serviceModel(sequelizeConnection, Sequelize);
const Client = clientModel(sequelizeConnection, Sequelize);

sequelizeConnection
  .sync({ alter: true })
  .then(() => console.log("Database is update"))
  .catch(err => {
    console.error(err);
  });

module.exports = { Place, TimeSegment, Employee, Service, Client };
