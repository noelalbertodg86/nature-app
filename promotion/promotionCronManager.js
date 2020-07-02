const structures = require("../structures/structures");
const PromotionClient = require("../models").PromotionClient;
const SmsMessageQueque = require("../models").SmsMessageQueque;
const readMailPromotion = require("./readMailByEmailSubject");
const email = require("../messageManager/mail");

async function readPromotionfromMail() {
  try {
    //await readSmsPromotion.readSmsPromotionFromMail();
    await readMailPromotion.readEmail();

    var activePromotionClient = await PromotionClient.findAll({
      where: {
        status: structures.promotionStates.ACTIVE
      },
      include: ["client", "promotion"]
    });

    console.log(
      "-----> Amount of promotion to send: ",
      activePromotionClient.length
    );
    //console.log(JSON.stringify(activePromotionClient));
    activePromotionClient.forEach(activePromotion => {
      promotion = activePromotion.promotion;
      client = activePromotion.client;

      if (promotion === null || client === null) {
        return;
      }
      if (promotion.canal === structures.messageCanal.SMS) {
        sendSmsPromotion(activePromotion, client);
      }

      if (promotion.canal === structures.messageCanal.EMAIL) {
        sendEmailPromotion(activePromotion, client);
      }
    });
  } catch (err) {
    console.log("#### readPromotionfromMail: ", err);
  }
}

async function sendSmsPromotion(element, client) {
  var promotion = element.promotion;
  SmsMessageQueque.create({
    destinationNumber: client.cellPhone,
    body: promotion.body,
    status: structures.messageState.PENDING,
    result: ""
  });
  closedPromotionClient(element);
}

async function sendEmailPromotion(element, client) {
  var promotion = element.promotion;
  if (promotion.canal === structures.messageCanal.EMAIL) {
    email
      .send(client.email, "PROMOCION DE NATURE", promotion.body)
      .then(function(info) {
        console.log("Promotional Email Sent");
        closedPromotionClient(element);
      })
      .catch(function(err) {
        console.log("Error sending promotional Email");
      });
  }
}

async function closedPromotionClient(element) {
  PromotionClient.update(
    {
      status: structures.promotionStates.CLOSED
    },
    {
      where: { id: parseInt(element.id) }
    }
  );
}
exports.readPromotionfromMail = readPromotionfromMail;
