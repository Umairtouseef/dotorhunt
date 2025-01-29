const Appointment = require("../modals/Appointment");

const getDoctorsWithPopularity = async (doctors) => {
  const doctorIds = doctors.map((doctor) => doctor._id.toString());
   console.log("doctorIds",doctorIds)
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
    return b.isFavourite - a.isFavourite; 
  });
  console.log("ddd",doctors.slice(0,2))
  return doctors.slice(0,2);
};

module.exports = getDoctorsWithPopularity;
