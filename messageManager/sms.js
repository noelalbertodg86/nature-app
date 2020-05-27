const Nexmo = require("nexmo");
const Message = require("../models").Message;
const Appointment = require("../models").Appointment;
const request = require("request");
const AppointmentMessageQueue = require("../models").AppointmentMessageQueue;
const structures = require("../structures/structures");

const nexmo = new Nexmo({
  apiKey: "7bced3b7",
  apiSecret: "wZ1YTyGpwEYI2m5c"
});

async function sendOnlineSms(messageType, appointmentId) {
  var smsData = await getAppointmentSmsData(messageType, appointmentId);
  var from = smsData.from;
  var to = smsData.to;
  var text = smsData.text;
  nexmo.message.sendSms(from, to, text);
  console.log("... SMS enviado", to, text);
}

async function sendAppointmentSms(messageMetaData) {
  var smsData = await getAppointmentSmsData(
    messageMetaData.type,
    messageMetaData.appointmentId
  );
  var smsUser = "noel.diaz";
  var smsPassword = "Da14Ca16";
  var to = "+" + smsData.to;
  var messageText = smsData.text;
  var url = `http://192.168.1.133:8090/SendSMS?username=${smsUser}&password=${smsPassword}&phone=${to}&message=${messageText}`;

  console.log("URL..", url);
  request.get(url, { timeout: 30000 }, (err, res, body) => {
    if (err) {
      AppointmentMessageQueue.update(
        {
          status: structures.messageState.ERROR,
          result: structures.messageState.ERROR
        },
        {
          where: { id: parseInt(messageMetaData.id) }
        }
      );
      return console.log(err);
    }
    if (res.statusCode !== 200) {
      console.log("... The local service for send SMS is down");
      return;
    }
    var info = JSON.parse(body);
    //console.log("body", body.url);
    if (info.status === "200") {
      AppointmentMessageQueue.update(
        {
          status: structures.messageState.SEND,
          result: structures.messageState.SEND
        },
        {
          where: { id: parseInt(messageMetaData.id) }
        }
      );
      console.log("Mensaje enviado exitosamente: ", info.phone, messageText);
    }
  });
}

async function getAppointmentSmsData(messageType, appointmentId) {
  const smsMessage = await Message.findOne({
    where: {
      canal: "SMS",
      type: messageType
    }
  });

  if (smsMessage.length === 0) {
    console.log(
      `There is not parameters for message. Canal: SMS, Type: ${messageType}`
    );
    return;
  }

  const appointmentModel = await Appointment.findOne({
    where: {
      id: parseInt(appointmentId)
    },
    include: ["place", "client", "timeSegment"]
  });

  var from = "NATURE Centro Medico";
  var to = "593" + appointmentModel.client.cellPhone.substr(-9, 9);
  var text = smsMessage.message;

  return { from, to, text };
}

async function send(text, destinationNumber) {
  var smsUser = "noel.diaz";
  var smsPassword = "Da14Ca16";
  var to = "+593" + destinationNumber.substr(-9, 9);
  var messageText = text;
  var getUrl = `http://192.168.1.133:8090/SendSMS?username=${smsUser}&password=${smsPassword}&phone=${to}&message=${messageText}`;

  console.log("URL..", getUrl);

  var options = {
    url: getUrl,
    timeout: "3000",
    headers: {
      timeout: "3000"
    }
  };

  return new Promise(function(resolve, reject) {
    // Do async job
    request.get(options, (err, res, body) => {
      if (err) {
        console.log("Error: ", err);
        reject(err);
      } else {
        var jsonBody = JSON.parse(body);
        console.log(
          "Mensaje enviado exitosamente: ",
          jsonBody.phone,
          messageText
        );
        resolve(jsonBody);
      }
    });
  });
}

async function checkSmsApihealth() {
  var getUrl = `http://192.168.1.133:8090/SendSMS?username=noel.diaz&password=Da14Ca16&phone=123456789&message=test`;
  var options = {
    url: getUrl,
    timeout: "3000",
    headers: {
      timeout: "3000"
    }
  };
  return new Promise(function(resolve, reject) {
    // Do async job
    request.get(options, (err, res, body) => {
      if (err) {
        //return false;
        resolve(false);
      } else {
        resolve(true);
      }
    });
  });
}

//exports.sendOnlineSms = sendOnlineSms;
//exports.sendAppointmentSms = sendAppointmentSms;
exports.send = send;
exports.checkSmsApihealth = checkSmsApihealth;
