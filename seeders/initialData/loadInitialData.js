var fs = require("fs");
const timeSegmentModel = require("../../models").TimeSegment;
const placeModel = require("../../models").Place;
const clientModel = require("../../models").Client;
const adminModel = require("../../models").Administrator;

console.log("Inicializando data en la base de datos");
loadSegmentTimeData();
loadPlacesData();
loadClientData();
loadAdministrator();

function loadSegmentTimeData() {
  var data = fs.readFileSync(__dirname + "/segmentData.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    timeSegmentModel.create({
      segment: line
    });
  });
}

function loadPlacesData() {
  var data = fs.readFileSync(__dirname + "/placesData.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    splitLine = line.split("\t");
    placeModel.create({
      name: splitLine[0],
      address: splitLine[1],
      phone: splitLine[2]
    });
  });
}

function loadAdministrator() {
  var data = fs.readFileSync(__dirname + "/Administrators.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    splitLine = line.split("\t");
    adminModel.create({
      email: splitLine[0],
      firstName: splitLine[1],
      lastName: splitLine[2],
      cellPhone: splitLine[3]
    });
  });
}

function loadClientData() {
  var data = fs.readFileSync(__dirname + "/clientDataTest.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    try {
      splitLine = line.split("\t");
      clientModel.create({
        ci: splitLine[2],
        fullName: splitLine[3],
        address: splitLine[4],
        phone: splitLine[5],
        cellPhone: splitLine[6],
        email: splitLine[7],
        type: "Clientes"
      });
    } catch (e) {
      console.log("Error load client initial data", e.stack);
    }
  });
}

function loadMessageData(messageModel) {
  var data = fs.readFileSync(__dirname + "/messageData.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    try {
      splitLine = line.split("\t");
      messageModel.create({
        canal: splitLine[0],
        type: splitLine[1],
        subject: splitLine[2],
        message: splitLine[3]
      });
    } catch (e) {
      console.log("Error load message initial data", e.stack);
    }
  });
}
