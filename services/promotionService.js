const Promotion = require("../models").Promotion;
const PromotionClient = require("../models").PromotionClient;
const Client = require("../models").Client;
const structures = require("../structures/structures");

async function saveNewPromotion(promotion) {
  const newPromotion = await Promotion.create(promotion);
  const clients = await Client.findAll();

  //console.log(JSON.parse(newPromotion));

  clients.forEach(element => {
    if (promotion.canal === structures.messageCanal.SMS) {
      if (element.cellPhone !== null && element.cellPhone !== "") {
        PromotionClient.create({
          status: structures.promotionStates.ACTIVE,
          result: "",
          promotionId: newPromotion.id,
          clientId: element.id
        });
      }
    }
    if (promotion.canal === structures.messageCanal.EMAIL) {
      if (element.email !== null && element.email !== "") {
        PromotionClient.create({
          status: structures.promotionStates.ACTIVE,
          result: "",
          promotionId: newPromotion.id,
          clientId: element.id
        });
      }
    }
  });
}

exports.saveNewPromotion = saveNewPromotion;
