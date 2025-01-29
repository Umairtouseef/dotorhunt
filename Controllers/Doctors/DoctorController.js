const { default: mongoose } = require("mongoose");
const Appointment = require("../../modals/Appointment");
const Doctor = require("../../modals/Doctor");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");
const SearchFeatures = require("../../utils/searchFeatures");
const getDoctorsWithPopularity = require("../../utils/popularDoctors");
const getFeaturedDoctors = require("../../utils/featuredDoctors");

const createDoctor = async (req, res, next) => {
  console.log(req.body);
  try {
    const doctor = new Doctor(req.body);
    const savedDoctor = await doctor.save();
    successResponse(res, "Doctor created successfully", savedDoctor);
  } catch (error) {
    next(error);
  }
};

const getAllDoctors = async (req, res, next) => {
  try {
    const resultPerPage = 10;
    const doctorsCount = await Doctor.countDocuments();
    const searchFeature = new SearchFeatures(Doctor.find(), req.query)
      .search()
      .filter();
    //  console.log("searchFeature",searchFeature)
    let doctors = await searchFeature.query;

    // console.log("doctors",doctors)
    console.log("Query Params:", req.query);

    if(req.query.popular){
      let doctors= await Doctor.find({})
      console.log("me",doctors)
      doctors = await getDoctorsWithPopularity(doctors);   
    }

    if(req.query.featured){
      let doctor= await Doctor.find({})
      console.log("me",doctors)
      doctors = await getFeaturedDoctors(doctors);
    }

    let filteredDoctorsCount = doctors.length;
    searchFeature.pagination(resultPerPage);

    // doctors = await searchFeature.query.clone();

    successResponse(res, "Doctors retrieved successfully", {
      success: true,
      doctors,
      doctorsCount,
      resultPerPage,
      filteredDoctorsCount,
    });
  } catch (error) {
    next(error);
  }
};

const getDoctorById = async (req, res, next) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return errorResponse(res, "Doctor not found", 404);
    }
    successResponse(res, "Doctor retrieved successfully", doctor);
  } catch (error) {
    next(error);
  }
};

const updateDoctor = async (req, res, next) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedDoctor) {
      return errorResponse(res, "Doctor not found", 404);
    }
    successResponse(res, "Doctor updated successfully", updatedDoctor);
  } catch (error) {
    next(error);
  }
};

const deleteDoctor = async (req, res, next) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!deletedDoctor) {
      return errorResponse(res, "Doctor not found", 404);
    }
    successResponse(res, "Doctor deleted successfully", deletedDoctor);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
};
