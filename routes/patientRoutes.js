const express = require("express");
const { patientController } = require("../Controllers");

const router = express.Router();

router.post("/patients", patientController.createPatient);
router.get("/patients", patientController.getAllPatients);
router.get("/patients:id", patientController.getPatientById);
router.put("/patients:id", patientController.updatePatient);
router.delete("/patients:id", patientController.deletePatient);

module.exports = router;
