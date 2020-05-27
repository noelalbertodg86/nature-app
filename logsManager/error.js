const structures = require("../structures/structures");
const EmailMessageQueque = require("../models").EmailMessageQueque;

ADMINISTRATOR_MAIL = "noelalbertodg86@gmail.com";

async function sendErrorToMail(err, observation) {
  var time = Date(Date.now()).toString();
  if (!observation) observation = "";

  var body = `<div>${time}</div><br><div>${observation}</div><br><br><div>${err}</div>`;

  emailNotification = {
    from: "",
    to: ADMINISTRATOR_MAIL,
    subject: "!!!!! ERROR NATURE APP !!!!!",
    body: body,
    status: structures.messageState.PENDING,
    result: ""
  };

  EmailMessageQueque.create(emailNotification);
}

exports.sendErrorToMail = sendErrorToMail;
