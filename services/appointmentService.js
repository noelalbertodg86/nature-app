const Appointment = require("../models").Appointment;
const EmailMessageQueque = require("../models").EmailMessageQueque;
const smsMessageQueque = require("../models").SmsMessageQueque;
const structures = require("../structures/structures");
const Message = require("../models").Message;

async function saveAppointmentNotification(appointmentId, notificationType) {
  saveEmailNotification(appointmentId, notificationType);
  saveSMSNotification(appointmentId, notificationType);
}

async function saveEmailNotification(appointmentId, notificationType) {
  const mailData = await getEmailData(appointmentId, notificationType);
  const emailMessage = mailData.emailMessage;
  const appointmentModel = mailData.appointmentModel;

  emailNotification = {
    from: "",
    to: appointmentModel.client.email,
    subject: emailMessage.subject,
    body: emailMessage.message,
    status: structures.messageState.PENDING,
    result: ""
  };

  EmailMessageQueque.create(emailNotification);
}

async function getEmailData(appointmentId, notificationType) {
  const emailMessage = await Message.findOne({
    where: {
      canal: structures.messageCanal.EMAIL,
      type: notificationType
    }
  });
  if (emailMessage.length === 0) {
    console.log(
      `There is not parameters for message. Canal: EMAIL, Type: ${type}`
    );
    return;
  }

  const appointmentModel = await Appointment.findOne({
    where: {
      id: parseInt(appointmentId)
    },
    include: ["place", "client", "timeSegment"]
  });

  emailMessage.message = emailMessage.message
    .replace("[[CLIENTNAME]]", appointmentModel.client.fullName)
    .replace("[[DATE]]", appointmentModel.date.toISOString().split("T")[0])
    .replace("[[TIME]]", appointmentModel.timeSegment.segment)
    .replace("[[PLACE]]", appointmentModel.place.name)
    .replace("[[ADDRESS]]", appointmentModel.place.address);

  return { emailMessage, appointmentModel };
}

async function saveSMSNotification(appointmentId, notificationType) {
  smsData = await getAppointmentSmsData(appointmentId, notificationType);
  smsMessage = {
    destinationNumber: smsData.to,
    body: smsData.text,
    status: structures.messageState.PENDING,
    result: ""
  };
  smsMessageQueque.create(smsMessage);
}

async function getAppointmentSmsData(appointmentId, notificationType) {
  const smsMessage = await Message.findOne({
    where: {
      canal: "SMS",
      type: notificationType
    }
  });

  if (smsMessage.length === 0) {
    console.log(
      `There is not parameters for message. Canal: SMS, Type: ${notificationType}`
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

exports.saveAppointmentNotification = saveAppointmentNotification;
