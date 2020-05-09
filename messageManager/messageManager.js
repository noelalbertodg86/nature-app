const mail = require("./mail");
const sms = require("./sms");
const structures = require("../structures/structures");
const AppointmentMessageQueue = require("../models").AppointmentMessageQueue;

async function messageManager() {
  const pendingMessages = await AppointmentMessageQueue.findAll({
    where: {
      status: structures.messageState.PENDING
    },
    include: "appointment"
  });

  console.log("Pending messages count: ", pendingMessages.length);
  pendingMessages.forEach(element => {
    if (element.canal === structures.messageCanal.EMAIL) {
      mail.sendEmailMessage(element);
    }
    if (element.canal === structures.messageCanal.SMS) {
      sms.sendSms(element);
    }
  });
}

exports.messageManager = messageManager;
