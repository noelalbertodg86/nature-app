const express = require("express");
const Joi = require("joi");
const { Service } = require("../db");

var router = express.Router();

router.get("/", async (req, res) => {
  const service = await Service.findAll();
  res.send(service);
});

router.get("/:id", async (req, res) => {
  const service = await Service.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (service.length === 0) {
    res.status(404).send("This service do not exists");
    return;
  }

  res.send(service);
});

router.post("/", async (req, res) => {
  //validate the input with joi

  const { error } = validateService(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newService = await Service.create(req.body);
  res.send(newService);
});

router.put("/:id", async (req, res) => {
  const { error } = validateService(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  await Service.update(req.body, { where: { id: parseInt(req.params.id) } });
  res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const service = await Service.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (service.length === 0) {
    res.status(404).send("This service do not exists");
    return;
  }

  await Service.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.send(service);
});

function validateService(place) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    price: Joi.number()
  };
  return Joi.validate(place, schema);
}

module.exports = router;
