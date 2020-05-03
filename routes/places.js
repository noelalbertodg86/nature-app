const express = require("express");
const Joi = require("joi");
const Place = require("../models").Place;
const defaultConfig = require("../configManager");

var router = express.Router();

initializePlacesData(Place);

router.get("/", async (req, res) => {
  const places = await Place.findAll();
  res.send(places);
});

router.get("/:id", async (req, res) => {
  const place = await Place.findAll({
    where: {
      id: parseInt(req.params.id)
    },
    include: ["appointments", "employees"]
  });
  if (place.length === 0) {
    res.status(404).send("This place do not exists");
    return;
  }

  res.send(place);
});

router.post("/", async (req, res) => {
  //validate the input with joi

  const { error } = validatePlace(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newPlace = await Place.create(req.body);
  res.send(newPlace);
});

router.put("/:id", async (req, res) => {
  const { error } = validatePlace(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  await Place.update(req.body, { where: { id: parseInt(req.params.id) } });
  res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const place = await Place.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (place.length === 0) {
    res.status(404).send("This place do not exists");
    return;
  }

  await Place.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.send(place);
});

function validatePlace(place) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    address: Joi.string()
      .max(255)
      .required(),
    phone: Joi.string()
      .max(15)
      .required()
      .empty(true)
  };
  return Joi.validate(place, schema);
}

function initializePlacesData(client) {
  if (Boolean(defaultConfig.getConfig("loadDbForce"))) {
    const placesInitialData = require("../seeders/initialData/loadInitData");
    placesInitialData.loadPlacesData(Place);
  }
}
module.exports = router;
