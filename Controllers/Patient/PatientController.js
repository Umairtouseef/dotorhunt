const Patient = require("../../modals/Patient");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const createPatient = async (req, res, next) => {
  try {
    const patient = new Patient(req.body);
    const savedPatient = await patient.save();
    successResponse(res, "Patient created successfully", savedPatient);
  } catch (error) {
    next(error);
  }
};

const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.find();
    successResponse(res, "Patients retrieved successfully", patients);
  } catch (error) {
    next(error);
  }
};

const getPatientById = async (req, res, next) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return errorResponse(res, "Patient not found", 404);
    }
    successResponse(res, "Patient retrieved successfully", patient);
  } catch (error) {
    next(error);
  }
};

const updatePatient = async (req, res, next) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPatient) {
      return errorResponse(res, "Patient not found", 404);
    }
    successResponse(res, "Patient updated successfully", updatedPatient);
  } catch (error) {
    next(error);
  }
};

const deletePatient = async (req, res, next) => {
  try {
    const deletedPatient = await Patient.findByIdAndDelete(req.params.id);
    if (!deletedPatient) {
      return errorResponse(res, "Patient not found", 404);
    }
    successResponse(res, "Patient deleted successfully", deletedPatient);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
