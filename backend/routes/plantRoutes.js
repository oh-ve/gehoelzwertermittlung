const express = require("express");
const app = express.Router();

const {
  getPlantsByCondition,
  getAllPlants,
  deleteAllPlants,
  deletePlant,
} = require("../controllers/plantControllers");

const { createPlant } = require("../controllers/createPlant");

const requireAuth = require("../middlewares/requireAuth");

app.use(requireAuth);

app.route("/").get(getAllPlants).post(createPlant).delete(deleteAllPlants);

app.route("/del/:plantId").delete(deletePlant);

app.route("/:pflanzenart").get(getPlantsByCondition);

module.exports = app;
