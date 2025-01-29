const {
  createMedicalRecord,
  getAllMedicalRecords,
  updateMedicalRecord,
  deleteMedicalRecord,
  getMedicalRecordById,
} = require("./medicalHistoryController");

module.exports = {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
};
