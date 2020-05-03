const express = require("express");
const Joi = require("joi");
const { Client } = require("../db");

var router = express.Router();

router.get("/", async (req, res) => {
  const client = await Client.findAll();
  res.send(client);
});

router.get("/:id", async (req, res) => {
  const client = await Client.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (client.length === 0) {
    res.status(404).send("This client do not exists");
    return;
  }

  res.send(client);
});

router.post("/", async (req, res) => {
  //validate the input with joi

  const { error } = validateClient(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newClient = await Client.create(req.body);
  res.send(newClient);
});

router.put("/:id", async (req, res) => {
  const { error } = validateClient(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  await Client.update(req.body, { where: { id: parseInt(req.params.id) } });
  res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const client = await Client.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (client.length === 0) {
    res.status(404).send("This client do not exists");
    return;
  }

  await Client.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.send(client);
});

function validateClient(place) {
  const schema = {
    id: Joi.string()
      .max(15)
      .required(),
    fullName: Joi.string()
      .min(3)
      .required(),
    address: Joi.string()
      .allow("")
      .optional(),
    phone: Joi.string()
      .max(15)
      .allow("")
      .optional(),
    cellPhone: Joi.string()
      .max(15)
      .allow("")
      .optional(),
    email: Joi.string()
      .allow("")
      .optional(),
    type: Joi.string()
      .max(10)
      .allow("")
      .optional()
  };
  return Joi.validate(place, schema);
}

module.exports = router;
