const express = require("express");
const { doctorController } = require("../Controllers");

const router = express.Router();

router.get("/doctors", doctorController.getAllDoctors);
router.post("/doctor", doctorController.createDoctor);
router.get("/doctors/popular", doctorController.getDoctorsWithPopularity);
router.get("/doctors/featured", doctorController.getFeaturedDoctors);
router.get("/doctors/career", doctorController.getDoctorsByCareer);
router.get("/doctors/favorites", doctorController.getFavoriteDoctors);
router.get("/doctors/:id", doctorController.getDoctorById);
router.get("/doctors/my/:id", doctorController.getMyDoctors);
router.put("/doctors/:id", doctorController.updateDoctor);
router.delete("/doctors/:id", doctorController.deleteDoctor);

module.exports = router;
