const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    career: { type: String, required: true },
    experience: { type: String, required: true },
    speciality: { type: String, required: true },
    stories: { percentage: Number, count: Number },
    rating: { type: Number, default: 0 },
    isFavourite: { type: Boolean, default: false },
    reviews: { type: Number, default: 0 },
    hourRate: { type: Number, required: true },
    timeSlot: {
      day: { type: String, required: true },
      afternoon: [String],
      evening: [String],
    },
    details: {
      running: Number,
      ongoing: Number,
      patientCount: Number,
      services: [String],
      location: String,
    },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Doctor", doctorSchema);
