const express = require("express");
const { medicalHistory } = require("../Controllers");
const router = express.Router();

router.post("/records", medicalHistory.createMedicalRecord);
router.get("/records", medicalHistory.getAllMedicalRecords);
router.get("/records:id", medicalHistory.getMedicalRecordById);
router.put("/records:id", medicalHistory.updateMedicalRecord);
router.delete("/records:id", medicalHistory.deleteMedicalRecord);

module.exports = router;
