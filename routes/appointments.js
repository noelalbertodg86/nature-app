const express = require("express");
const Joi = require("joi");
const Appointment = require("../models").Appointment;

var router = express.Router();

const appointmentStates = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED"
};

router.get("/", async (req, res) => {
  const appointment = await Appointment.findAll();
  res.send(appointment);
});

router.get("/:id", async (req, res) => {
  const appointment = await Appointment.findAll({
    where: {
      id: parseInt(req.params.id)
    },
    include: ["place", "client", "timeSegment"]
  });
  if (appointment.length === 0) {
    res.status(404).send("This appointment do not exists");
    return;
  }

  res.send(appointment);
});

router.post("/", async (req, res) => {
  //validate the input with joi

  const { error } = validateAppointment(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newAppointment = await Appointment.create(req.body);
  res.send(newAppointment);
});

router.put("/:id", async (req, res) => {
  const { error } = validateAppointment(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  await Appointment.update(req.body, {
    where: { id: parseInt(req.params.id) }
  });
  res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const appointment = await Appointment.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (appointment.length === 0) {
    res.status(404).send("This appointment do not exists");
    return;
  }

  await Appointment.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.send(appointment);
});

function validateAppointment(place) {
  const schema = {
    date: Joi.string()
      .isoDate()
      .required(),
    segmentId: Joi.number().required(),
    clientId: Joi.number().required(),
    placeId: Joi.number().required(),
    serviceId: Joi.number().optional(),
    employeeId: Joi.number().optional()
  };
  return Joi.validate(place, schema);
}
//allow('').optional()
module.exports = router;
