const express = require("express");
const { diagnosisOffer } = require("../Controllers");
const router = express.Router();

router.post("/offer", diagnosisOffer.createDiagnosisOffer);
router.get("/offer", diagnosisOffer.getAllDiagnosisOffers);
router.get("/offer:id", diagnosisOffer.getDiagnosisOfferById);
router.put("/offer:id", diagnosisOffer.updateDiagnosisOffer);
router.delete("/offer:id", diagnosisOffer.deleteDiagnosisOffer);

module.exports = router;
