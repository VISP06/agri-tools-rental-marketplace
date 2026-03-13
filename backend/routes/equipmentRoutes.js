const express = require("express");
const {
  getEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment,
  deleteEquipment,
  rateEquipment
} = require("../controllers/equipmentController");

const router = express.Router();

router.get("/", getEquipments);
router.get("/:id", getEquipmentById);
router.post("/", createEquipment);
router.patch("/:id", updateEquipment);
router.delete("/:id", deleteEquipment);
router.post("/:id/rate", rateEquipment);

module.exports = router;

