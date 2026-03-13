const express = require("express");
const {
  getEquipments,
  getEquipmentById,
  createEquipment,
  updateEquipment
} = require("../controllers/equipmentController");

const router = express.Router();

router.get("/", getEquipments);
router.get("/:id", getEquipmentById);
router.post("/", createEquipment);
router.patch("/:id", updateEquipment);

module.exports = router;

