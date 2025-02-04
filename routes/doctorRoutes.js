const express = require("express");
const { doctorController } = require("../Controllers");

const router = express.Router();

router.get("/doctors", doctorController.getAllDoctors);
router.get("/doctors/popular", doctorController.getDoctorsWithPopularity);
router.get("/doctors/featured", doctorController.getFeaturedDoctors);
router.get("/doctors/:id", doctorController.getDoctorById);
router.post("/doctors", doctorController.createDoctor);
router.put("/doctors/:id", doctorController.updateDoctor);
router.delete("/doctors/:id", doctorController.deleteDoctor);

module.exports = router;
