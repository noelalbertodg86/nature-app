const Sequelize = require("sequelize");
PlaceModel = require("./models/place");
TimeSegmentModel = require("./models/timeSegment");
employeeModel = require("./models/employee");
serviceModel = require("./models/service");
clientModel = require("./models/client");
config = require("./config");

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

if (Boolean(config.getConfig("db.loadDbForce"))) {
  loadDbForce();
} else if (Boolean(config.getConfig("db.loadDbAlter"))) {
  loadDbAlter();
}

module.exports = { Place, TimeSegment, Employee, Service, Client };

function loadDbForce() {
  sequelizeConnection
    .sync({ force: true })
    .then(() => console.log("Database is update"))
    .catch(err => {
      console.error(err);
    });
}

function loadDbAlter() {
  sequelizeConnection
    .sync({ alter: true })
    .then(() => console.log("Database is update"))
    .catch(err => {
      console.error(err);
    });
}
