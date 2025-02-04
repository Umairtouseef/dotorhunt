const MedicalRecord = require("../../modals/MedicalRecord");
const { successResponse } = require("../../utils/responseHelper");

const createMedicalRecord = async (req, res, next) => {
  try {
    const { patient, prescription, date } = req.body;

    const medicalRecord = new MedicalRecord({
      patient,
      prescription,
      date,
    });
    await medicalRecord.save();
    return successResponse(
      res,
      "Medical record created successfully",
      medicalRecord
    );
  } catch (error) {
    next(error);
  }
};

const getAllMedicalRecords = async (req, res, next) => {
  try {
    const records = await MedicalRecord.find().populate("patient");

    return successResponse(
      res,
      "Medical records retrieved successfully",
      records
    );
  } catch (error) {
    next(error);
  }
};

const getMedicalRecordById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const record = await MedicalRecord.findById(id).populate("patient");

    if (!record) {
      res.status(404);
      throw new Error("Medical record not found");
    }

    return successResponse(
      res,
      "Medical record retrieved successfully",
      record
    );
  } catch (error) {
    next(error);
  }
};

const updateMedicalRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedRecord = await MedicalRecord.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }

    return successResponse(
      res,
      "Medical record updated successfully",
      updatedRecord
    );
  } catch (error) {
    next(error);
  }
};

const deleteMedicalRecord = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedRecord = await MedicalRecord.findByIdAndDelete(id);

    if (!deletedRecord) {
      res.status(404);
      throw new Error("Medical record not found");
    }

    return successResponse(res, "Medical record deleted successfully");
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
};
