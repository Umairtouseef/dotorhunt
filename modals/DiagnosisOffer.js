const mongoose = require("mongoose");

const diagnosisOfferSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    tests_offer: { type: Number, required: true },
    price: { type: Number, required: true },
    services: [String],
  },
  { timestamps: true }
);

module.exports = mongoose.model("DiagnosisOffer", diagnosisOfferSchema);
