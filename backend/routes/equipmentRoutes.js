const express = require("express");
const {
  getEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  rateEquipment,
  geocodeSearch,
  reverseGeocode
} = require("../controllers/equipmentController");

const router = express.Router();

router.get("/geocode", geocodeSearch);
router.get("/reverse-geocode", reverseGeocode);
router.get("/", getEquipments);
router.get("/:id", getEquipmentById);
router.post("/", createEquipment);
router.patch("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);
router.post("/:id/rate", rateEquipment);

module.exports = router;

