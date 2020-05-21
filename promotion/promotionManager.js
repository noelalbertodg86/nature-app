const structures = require("../structures/structures");
const Promotion = require("../models").Promotion;

async function saveSMSPromotion(smsBody) {
  promotion = {
    type: structures.messageType.PROMOTION,
    canal: structures.messageCanal.SMS,
    body: smsBody
  };
  Promotion.create(promotion);
}

exports.saveSMSPromotion = saveSMSPromotion;
