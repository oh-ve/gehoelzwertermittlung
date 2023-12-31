const Plant = require("../schemas/Plant");
const { calculatePlantData } = require("./createPlant");

async function createPlant(req, res) {
  try {
    const plantData = req.body;
    const calculatedData = calculatePlantData(plantData);
    const newPlant = new Plant({
      ...plantData,
      ...calculatedData,
    });
    const result = await newPlant.save();
    console.log("Plant created:", result);
    return res.status(201).json(result);
  } catch (error) {
    console.error("Error creating plant:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPlantsByCondition(condition) {
  try {
    const plants = await Plant.find(condition);
    console.log("Plants matching condition:", plants);
    return plants;
  } catch (error) {
    console.error("Error getting plants by condition:", error);
    throw error;
  }
}

const getAllPlants = async (req, res) => {
  try {
    const plants = await Plant.find();
    console.log(plants);
    res.status(200).json({
      plants,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
};

async function deletePlant(req, res) {
  const plantId = req.params.plantId;
  try {
    const result = await Plant.findByIdAndDelete(plantId);
    if (result) {
      res.status(200).send({ message: "Plant deleted successfully" });
    } else {
      res.status(404).send({ message: "Plant not found" });
    }
  } catch (error) {
    console.error("Error deleting plant:", error);
    res.status(500).send({ message: "Error deleting plant" });
  }
}

async function deleteAllPlants() {
  try {
    const result = await Plant.deleteMany();
    console.log("All plants deleted:", result);
    return result;
  } catch (error) {
    console.error("Error deleting all plants:", error);
    throw error;
  }
}

module.exports = {
  createPlant,
  getPlantsByCondition,
  getAllPlants,
  deletePlant,
  deleteAllPlants,
};
