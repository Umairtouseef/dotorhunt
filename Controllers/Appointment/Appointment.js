const Appointment = require("../../modals/Appointment");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const createAppointment = async (req, res, next) => {
  try {
    const { patient, doctor, time, date, location } = req.body;

    const newAppointment = await Appointment.create({
      patient,
      doctor,
      time,
      date,
      location,
      status: "confirmed",
    });

    successResponse(res, "Appointment created successfully", newAppointment);
  } catch (error) {
    next(error);
  }
};

const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("patient", "firstName lastName")
      .populate("doctor", "name speciality");

    successResponse(res, "Appointments fetched successfully", appointments);
  } catch (error) {
    next(error);
  }
};

const getAppointmentById = async (req, res, next) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate("patient", "firstName lastName")
      .populate("doctor", "name speciality");

    if (!appointment) {
      return errorResponse(res, "Appointment not found", 404);
    }

    successResponse(res, "Appointment fetched successfully", appointment);
  } catch (error) {
    next(error);
  }
};

const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedAppointment) {
      return errorResponse(res, "Appointment not found", 404);
    }

    successResponse(
      res,
      "Appointment updated successfully",
      updatedAppointment
    );
  } catch (error) {
    next(error);
  }
};

const deleteAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedAppointment = await Appointment.findByIdAndDelete(id);

    if (!deletedAppointment) {
      return errorResponse(res, "Appointment not found", 404);
    }

    successResponse(
      res,
      "Appointment deleted successfully",
      deletedAppointment
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};
