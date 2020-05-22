"use strict";
const nodemailer = require("nodemailer");
const Message = require("../models").Message;
const Appointment = require("../models").Appointment;
const AppointmentMessageQueue = require("../models").AppointmentMessageQueue;
const structures = require("../structures/structures");

let transporter = nodemailer.createTransport({
  host: "mail.nature.com.ec",
  port: 465,
  secure: true,
  auth: {
    user: "nature@nature.com.ec",
    pass: "Nature2020"
  }
});

async function sendEmailMessage(messageMetaData) {
  const mailData = await getEmailData(messageMetaData);
  const emailMessage = mailData.emailMessage;
  const appointmentModel = mailData.appointmentModel;
  transporter
    .sendMail({
      from: '"NATURE Centro Medico" <nature@nature.com.ec>', // sender address
      to: appointmentModel.client.email, // list of receivers
      subject: emailMessage.subject, // Subject line
      text: emailMessage.message, // plain text body
      html: emailMessage.message // html body
    })
    .then(function(info) {
      console.log("Message sent: %s", info.messageId);
      AppointmentMessageQueue.update(
        {
          status: structures.messageState.SEND,
          result: structures.messageState.SEND
        },
        {
          where: { id: parseInt(messageMetaData.id) }
        }
      );
    })
    .catch(function(err) {
      AppointmentMessageQueue.update(
        { result: structures.messageState.ERROR },
        {
          where: { id: parseInt(messageMetaData.id) }
        }
      );
      console.log(err);
    });
}

async function getEmailData(messageMetaData) {
  const emailMessage = await Message.findOne({
    where: {
      canal: "EMAIL",
      type: messageMetaData.type
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
      id: parseInt(messageMetaData.appointmentId)
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

async function send(to, subject, body) {
  transporter.sendMail({
    from: '"NATURE Centro Medico" <nature@nature.com.ec>', // sender address
    to: to, // list of receivers
    subject: subject, // Subject line
    text: body, // plain text body
    html: body // html body
  });
}

//exports.sendEmailMessage = sendEmailMessage;
exports.send = send;
