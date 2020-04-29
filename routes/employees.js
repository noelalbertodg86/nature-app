const express = require("express");
const Joi = require("joi");
const { Employee } = require("../db");

var router = express.Router();

router.get("/", async (req, res) => {
  const employee = await Employee.findAll();
  res.send(employee);
});

router.get("/:id", async (req, res) => {
  const employee = await Employee.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (employee.length === 0) {
    res.status(404).send("This employee do not exists");
    return;
  }

  res.send(employee);
});

router.post("/", async (req, res) => {
  //validate the input with joi

  const { error } = validateEmployee(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  const newEmployee = await Employee.create(req.body);
  res.send(newEmployee);
});

router.put("/:id", async (req, res) => {
  const { error } = validateEmployee(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }
  await Employee.update(req.body, { where: { id: parseInt(req.params.id) } });
  res.send(req.body);
});

router.delete("/:id", async (req, res) => {
  const employee = await Employee.findAll({
    where: {
      id: parseInt(req.params.id)
    }
  });

  if (employee.length === 0) {
    res.status(404).send("This employee do not exists");
    return;
  }

  await Employee.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });

  res.send(employee);
});

function validateEmployee(place) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    lastName: Joi.string()
      .max(255)
      .required(),
    degree: Joi.string()
      .max(15)
      .required()
      .empty(true),
    phone: Joi.string()
      .max(15)
      .required()
      .empty(true)
  };
  return Joi.validate(place, schema);
}

module.exports = router;
