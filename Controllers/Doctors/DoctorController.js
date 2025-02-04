const { default: mongoose } = require("mongoose");
const Appointment = require("../../modals/Appointment");
const Doctor = require("../../modals/Doctor");
const {
  successResponse,
  errorResponse,
} = require("../../utils/responseHelper");
const SearchFeatures = require("../../utils/searchFeatures");

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
    let doctors = await searchFeature.query;
    searchFeature.pagination(resultPerPage);
    doctors = await searchFeature.query.clone();
    let filteredDoctorsCount = doctors.length;

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
const getDoctorsWithPopularity = async (req, res, next) => {
  try {
    let doctors = await Doctor.find({});
    const doctorIds = doctors.map(
      (doctor) => new mongoose.Types.ObjectId(doctor._id)
    );
    const activeAppointments = await Appointment.aggregate([
      {
        $match: {
          doctor: { $in: doctorIds },
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: "$doctor",
          count: { $sum: 1 },
        },
      },
    ]);

    doctors = doctors.map((doctor) => {
      const activeCount = activeAppointments.find(
        (app) => app._id.toString() === doctor._id.toString()
      );
      return {
        ...doctor.toObject(),
        activeAppointmentsCount: activeCount ? activeCount.count : 0,
      };
    });

    doctors.sort((a, b) => {
      if (b.rating !== a.rating) return b.rating - a.rating;
      if (b.reviews !== a.reviews) return b.reviews - a.reviews;
      if (b.activeAppointmentsCount !== a.activeAppointmentsCount)
        return b.activeAppointmentsCount - a.activeAppointmentsCount;
      return (b.isFavourite ? 1 : 0) - (a.isFavourite ? 1 : 0);
    });

    return res.status(200).json({
      success: true,
      message: "Top 5 doctors fetched successfully",
      data: doctors.slice(0, 5),
    });
  } catch (error) {
    console.error("Error in getDoctorsWithPopularity:", error);
    next(error);
  }
};
const getFeaturedDoctors = async (req, res, next) => {
  try {
    let doctors = await Doctor.find({});
    const doctorIds = doctors.map(
      (doctor) => new mongoose.Types.ObjectId(doctor._id)
    );
    const activeAppointments = await Appointment.aggregate([
      {
        $match: {
          doctor: { $in: doctorIds },
          status: { $in: ["confirmed", "completed"] },
        },
      },
      {
        $group: {
          _id: "$doctor",
          count: { $sum: 1 },
        },
      },
    ]);
    const appointmentCountMap = new Map();
    activeAppointments.forEach((app) => {
      appointmentCountMap.set(app._id.toString(), app.count);
    });
    doctors = doctors.map((doctor) => {
      return {
        ...doctor.toObject(),
        activeAppointmentsCount:
          appointmentCountMap.get(doctor._id.toString()) || 0,
      };
    });
    doctors = doctors.filter((doctor) => doctor.isFeatured === true);
    return res.status(200).json({
      success: true,
      message: "  Featured doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    console.error("Error in getFeaturedDoctors:", error);
    next(error);
  }
};

module.exports = {
  createDoctor,
  getAllDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  getDoctorsWithPopularity,
  getFeaturedDoctors,
};
