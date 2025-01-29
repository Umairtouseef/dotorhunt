const express = require("express");
const { appointmentController } = require("../Controllers");
const router = express.Router();

router.post("/appointment", appointmentController.createAppointment);
router.get("/appointment", appointmentController.getAllAppointments);
router.get("/appointment:id", appointmentController.getAppointmentById);
router.put("/appointment:id", appointmentController.updateAppointment);
router.delete("/appointment:id", appointmentController.deleteAppointment);

module.exports = router;
