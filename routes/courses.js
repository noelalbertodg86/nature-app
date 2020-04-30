const express = require("express");
const Joi = require("joi");

var router = express.Router();
//const app = express();
//app.use(express.json());

const courses = [
  { id: 1, name: "Math" },
  { id: 2, name: "Espanish" },
  { id: 3, name: "Bio" }
];

router.get("/", (req, res) => {
  res.send("Hello Word!!!!");
});

router.get("/api/courses", (req, res) => {
  res.send([1, 2, 3]);
});

router.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("this course do not exists");
  }

  res.send(course);
});

router.get("/api/courses/:id/:name", (req, res) => {
  res.send(req.params);
});

router.post("/api/courses", (req, res) => {
  //validate the input with joi
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  const validateResult = Joi.validate(req.body, schema);
  if (validateResult.error) {
    res.status(400).send(validateResult.error.details[0].message);
    return;
  }
  const newCourse = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(newCourse);
  res.send(newCourse);
});

router.put("/api/courses/:id", (req, res) => {
  //this method is for update
  //look the course
  let course = courses.find(c => c.id === parseInt(req.params.id));
  //if not existing, return 404
  if (!course) {
    res.status(404).send("The course do not exists");
    return;
  }

  //validate
  //if invalid, return 400 - Bad request
  const { error } = validateCourse(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  //Update course
  course.name = req.body.name;
  //return the update course
  res.send(course);
});

router.delete("/api/courses/:id", (req, res) => {
  let course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("The course do not exists");
    return;
  }

  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

function validateCourse(course) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required()
  };
  return Joi.validate(course, schema);
}

module.exports = router;

//process.env.PORT
