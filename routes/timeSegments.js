const express = require("express");
const Joi = require("joi");
const { TimeSegment } = require("../db");

var router = express.Router();

router.get("/", async (req, res) => {
  res.send(await TimeSegment.findAll());
});

router.get("/:id", async (req, res) => {
  const time = await TimeSegment.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (time.length === 0) {
    res.status(404).send("This place do not exists");
    return;
  }

  res.send(time);
});

router.post("/", async (req, res) => {
  //validate the input with joi

  const { error } = validateTimeSegment(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newTime = await TimeSegment.create(req.body);
  res.send(newTime);
});

router.put("/:id", async (req, res) => {
  const { error } = validateTimeSegment(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  await TimeSegment.update(req.body, {
    where: { id: parseInt(req.params.id) }
  });
  res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const time = await TimeSegment.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (time.length === 0) {
    res.status(404).send("This place do not exists");
    return;
  }

  await TimeSegment.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.send(time);
});

function validateTimeSegment(place) {
  const schema = {
    segment: Joi.string()
      .regex(/^([0-9]{2})\:([0-9]{2})$/)
      .required()
  };
  return Joi.validate(place, schema);
}

module.exports = router;
