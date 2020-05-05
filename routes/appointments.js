const express = require("express");
const Joi = require("joi");
const Appointment = require("../models").Appointment;
const Message = require("../models").Message;
const defaultConfig = require("../configManager");
const mail = require("../messageManager/mail");

var router = express.Router();

initializeMessageData(Message);

const appointmentStates = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED"
};

const messageType = {
  NEWAPPOINTMENT: "NEWAPPOINTMENT"
};

router.get("/", async (req, res) => {
  const appointment = await Appointment.findAll();
  res.send(appointment);
});

router.get("/:id", async (req, res) => {
  const appointment = await getAppointmentById(req.params.id);
  if (appointment.length === 0) {
    res.status(404).send("This appointment do not exists");
    return;
  }
  res.send(appointment);
});

router.post("/", async (req, res) => {
  const { error } = validateAppointment(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newAppointment = await Appointment.create(req.body);
  mail.sendEmailMessage(messageType.NEWAPPOINTMENT, newAppointment.id);
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

function initializeMessageData(messageModel) {
  if (Boolean(defaultConfig.getConfig("loadDbForce"))) {
    const clientInitialData = require("../seeders/initialData/loadInitData");
    clientInitialData.loadMessageData(messageModel);
  }
}

async function getAppointmentById(id) {
  return Appointment.findAll({
    where: {
      id: parseInt(id)
    },
    include: ["place", "client", "timeSegment"]
  });
}
//allow('').optional()
module.exports = router;
