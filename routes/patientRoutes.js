const express = require("express");
const { patientController } = require("../Controllers");

const router = express.Router();

router.post("/patients", patientController.createPatient);  // Create patient
// router.get("/patients", patientController.getAllPatients);  // Get all patients
// router.get("/patients:id", patientController.getPatientById);  // Get a patient by ID
// router.put("/patients:id", patientController.updatePatient);  // Update patient
// router.delete("/patients:id", patientController.deletePatient);  // Delete patient

module.exports = router; 
