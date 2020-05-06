const Nexmo = require("nexmo");
const Message = require("../models").Message;
const Appointment = require("../models").Appointment;
const request = require("request");

const nexmo = new Nexmo({
  apiKey: "7bced3b7",
  apiSecret: "wZ1YTyGpwEYI2m5c"
});

async function sendOnlineSms(messageType, appointmentId) {
  var smsData = await getSmsData(messageType, appointmentId);
  var from = smsData.from;
  var to = smsData.to;
  var text = smsData.text;
  nexmo.message.sendSms(from, to, text);
  console.log("... SMS enviado", to, text);
}

async function sendSms(messageType, appointmentId) {
  var smsData = await getSmsData(messageType, appointmentId);
  console.log("sms data", smsData);
  var smsUser = "noel.diaz";
  var smsPassword = "Da14Ca16";
  var to = "+" + smsData.to;
  var messageText = smsData.text;
  var url = `http://192.168.1.133:8090/SendSMS?username=${smsUser}&password=${smsPassword}&phone=${to}&message=${messageText}`;

  console.log("URL..", url);
  request.get(url, { timeout: 30000 }, (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    if (res.statusCode !== 200) {
      console.log("... The local service for send SMS is down");
      return;
    }
    var info = JSON.parse(body);
    //console.log("body", body.url);
    if (info.status === "200") {
      console.log("Mensaje enviado exitosamente: ", info.phone, messageText);
    }
  });
}

async function getSmsData(messageType, appointmentId) {
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

exports.sendOnlineSms = sendOnlineSms;
exports.sendSms = sendSms;
