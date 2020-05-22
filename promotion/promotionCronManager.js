const structures = require("../structures/structures");
const Promotion = require("../models").Promotion;
const PromotionClient = require("../models").PromotionClient;
const EmailMessageQueque = require("../models").EmailMessageQueque;
const SmsMessageQueque = require("../models").SmsMessageQueque;
const readSmsPromotion = require("./readMailBySMSSubject");
const readMailPromotion = require("./readMailByEmailSubject");

async function readPromotionfromMail() {
  try {
    await readSmsPromotion.readSmsPromotionFromMail();
    await readMailPromotion.readMailPromotionFromMail();

    var activePromotionClient = await PromotionClient.findAll({
      where: {
        status: structures.promotionStates.ACTIVE
      },
      include: ["client", "promotion"]
    });
    //console.log(JSON.stringify(activePromotionClient));
    activePromotionClient.forEach(element => {
      promotion = element.promotion;
      client = element.client;
      if (promotion === null || client === null) {
        return;
      }

      if (element.promotion.canal === structures.messageCanal.SMS) {
        SmsMessageQueque.create({
          destinationNumber: client.cellPhone,
          body: promotion.body,
          status: structures.messageState.PENDING,
          result: ""
        });
      }

      if (element.promotion.canal === structures.messageCanal.EMAIL) {
        EmailMessageQueque.create({
          from: "",
          to: client.email,
          subject: "NATURE Promocion",
          body: promotion.body,
          status: structures.messageState.PENDING,
          result: ""
        });
      }

      PromotionClient.update(
        {
          status: structures.promotionStates.CLOSED
        },
        {
          where: { id: parseInt(element.id) }
        }
      );
    });
  } catch (err) {
    console.log("#### readPromotionfromMail: ", err);
  }
}

exports.readPromotionfromMail = readPromotionfromMail;
