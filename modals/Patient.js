const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    medicalHistory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MedicalRecord",
    },
    location: { type: String },
    contactInfo: {
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    doctor: [{ type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }],
    status: { type: String, default: "Active" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Patient", patientSchema);
