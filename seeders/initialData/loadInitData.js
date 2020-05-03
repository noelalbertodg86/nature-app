var fs = require("fs");

const load = (timeSegmentModel, placeModel, clientData) => {
  try {
    loadSegmentTimeData(timeSegmentModel);
    loadPlacesData(placeModel);
    loadClientData(clientData);
  } catch (e) {
    console.log("Error:", e.stack);
  }
};

function loadSegmentTimeData(timeSegmentModel) {
  var data = fs.readFileSync(__dirname + "/segmentData.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    timeSegmentModel.create({
      segment: line
    });
  });
}

function loadPlacesData(placeModel) {
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

function loadClientData(clientModel) {
  var data = fs.readFileSync(__dirname + "/clientDataTest.txt", "utf8");
  data.split(/\r?\n/).forEach(function(line) {
    try {
      splitLine = line.split("\t");
      clientModel.create({
        id: splitLine[2],
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

exports.load = load;
