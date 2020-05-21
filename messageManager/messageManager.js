const mail = require("./mail");
const sms = require("./sms");
const structures = require("../structures/structures");
const emailMessageQueque = require("../models").EmailMessageQueque;
const smsMessageQueque = require("../models").SmsMessageQueque;

async function messageManager() {
  sendEmail();
  sendSms();
}

async function sendEmail() {
  const pendingEmailMessages = await emailMessageQueque.findAll({
    where: {
      status: structures.messageState.PENDING
    }
  });

  console.log("Pending Email messages count: ", pendingEmailMessages.length);
  pendingEmailMessages.forEach(element => {
    mail
      .send(element.to, element.subject, element.body)
      .then(function(info) {
        console.log("Email sent");
        emailMessageQueque.update(
          {
            status: structures.messageState.SEND,
            result: structures.messageState.SEND
          },
          {
            where: { id: parseInt(element.id) }
          }
        );
      })
      .catch(function(err) {
        console.log("Error send Email");
        emailMessageQueque.update(
          {
            result: structures.messageState.ERROR
          },
          {
            where: { id: parseInt(element.id) }
          }
        );
      });
  });
}

async function sendSms() {
  const pendingSmsMessages = await smsMessageQueque.findAll({
    where: {
      status: structures.messageState.PENDING
    }
  });

  console.log("Pending SMS messages count: ", pendingSmsMessages.length);
  pendingSmsMessages.forEach(element => {
    var smsSendResult = sms.send(element.body, element.destinationNumber);
    smsSendResult.then(
      function(result) {
        smsMessageQueque.update(
          {
            status: structures.messageState.SEND,
            result: structures.messageState.SEND
          },
          {
            where: { id: parseInt(element.id) }
          }
        );
        console.log(">> SMS send ok: ", result);
      },
      function(err) {
        console.log(">> Error sending sms: ", err);
        smsMessageQueque.update(
          {
            result: structures.messageState.ERROR
          },
          {
            where: { id: parseInt(element.id) }
          }
        );
      }
    );
  });
}

exports.messageManager = messageManager;
