const Plant = require("../schemas/Plant");

// Pflanzen nach bestimmten Kriterien aufrufen

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

// Alle Pflanzen aufrufen

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

// Eine Pflanze löschen

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

// Alle Pflanzen löschen

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
  getPlantsByCondition,
  getAllPlants,
  deletePlant,
  deleteAllPlants,
};
