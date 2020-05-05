const Nexmo = require("nexmo");
const Message = require("../models").Message;
const Appointment = require("../models").Appointment;

const nexmo = new Nexmo({
  apiKey: "7bced3b7",
  apiSecret: "wZ1YTyGpwEYI2m5c"
});

async function sendSms(messageType, appointmentId) {
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
  nexmo.message.sendSms(from, to, text);
  console.log("... SMS enviado", to, text);
}

exports.sendSms = sendSms;
