const Appointment = require("../modals/Appointment");

const getFeaturedDoctors = async (doctors) => {
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
  console.log(" Featured Doctors:", doctors);

  doctors = doctors.filter(
    (doctor) =>
      doctor.isFeatured == "true" ||  
      doctor.rating >= 4.7 ||
      doctor.reviews > 100 ||
      doctor.activeAppointmentsCount > 50
  );
  console.log("Filtered Featured Doctors:", doctors.length);
  return doctors.slice(0, 3);
};

module.exports = getFeaturedDoctors;
