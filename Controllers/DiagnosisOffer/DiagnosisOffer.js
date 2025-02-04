const DiagnosisOffer = require("../../modals/DiagnosisOffer");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");

const createDiagnosisOffer = async (req, res, next) => {
  try {
    const { name, age, tests_offer, price, services } = req.body;

    const newOffer = await DiagnosisOffer.create({
      name,
      age,
      tests_offer,
      price,
      services,
    });

    successResponse(res, "Diagnosis offer created successfully", newOffer);
  } catch (error) {
    next(error);
  }
};

const getAllDiagnosisOffers = async (req, res, next) => {
  try {
    const offers = await DiagnosisOffer.find();
    successResponse(res, "Diagnosis offers fetched successfully", offers);
  } catch (error) {
    next(error);
  }
};

const getDiagnosisOfferById = async (req, res, next) => {
  try {
    const offer = await DiagnosisOffer.findById(req.params.id);

    if (!offer) {
      return errorResponse(res, "Diagnosis offer not found", 404);
    }

    successResponse(res, "Diagnosis offer fetched successfully", offer);
  } catch (error) {
    next(error);
  }
};

const updateDiagnosisOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const updatedOffer = await DiagnosisOffer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedOffer) {
      return errorResponse(res, "Diagnosis offer not found", 404);
    }

    successResponse(res, "Diagnosis offer updated successfully", updatedOffer);
  } catch (error) {
    next(error);
  }
};

const deleteDiagnosisOffer = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedOffer = await DiagnosisOffer.findByIdAndDelete(id);

    if (!deletedOffer) {
      return errorResponse(res, "Diagnosis offer not found", 404);
    }

    successResponse(res, "Diagnosis offer deleted successfully", deletedOffer);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDiagnosisOffer,
  getAllDiagnosisOffers,
  getDiagnosisOfferById,
  updateDiagnosisOffer,
  deleteDiagnosisOffer,
};
