"use strict";
const nodemailer = require("nodemailer");
const Message = require("../models").Message;
const Appointment = require("../models").Appointment;

const sendEmail = async emailMessage => {
  let transporter = nodemailer.createTransport({
    host: "mail.nature.com.ec",
    port: 465,
    secure: true,
    auth: {
      user: "nature@nature.com.ec",
      pass: "Nature2020"
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"NATURE Centro Medico" <nature@nature.com.ec>', // sender address
    to: emailMessage.to, // list of receivers
    subject: emailMessage.subject, // Subject line
    text: emailMessage.message, // plain text body
    html: emailMessage.message // html body
  });

  console.log("Message sent: %s", info.messageId);
};

async function sendEmailMessage(type, appointmentId) {
  const emailMessage = await Message.findOne({
    where: {
      canal: "EMAIL",
      type: type
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

  emailMessage["to"] = appointmentModel.client.email;
  emailMessage.message = emailMessage.message
    .replace("[[CLIENTNAME]]", appointmentModel.client.fullName)
    .replace("[[DATE]]", appointmentModel.date.toISOString().split("T")[0])
    .replace("[[TIME]]", appointmentModel.timeSegment.segment)
    .replace("[[PLACE]]", appointmentModel.place.name)
    .replace("[[ADDRESS]]", appointmentModel.place.address);
  sendEmail(emailMessage).catch(console.error);
}

exports.sendEmailMessage = sendEmailMessage;
