const {
  doctorRoutes,
  patientRoutes,
  medicalHistoryRoutes,
  diagnosisOfferRoutes,
  appointmentsRoutes,
  userRoutes,
} = require("../routes");

const routesLoader = (app) => {
  app.use("/api", userRoutes);
  app.use("/api", doctorRoutes);
  app.use("/api", patientRoutes);
  app.use("/api", medicalHistoryRoutes);
  app.use("/api", diagnosisOfferRoutes);
  app.use("/api", appointmentsRoutes);

  console.log("Routes have been loaded.");
};

module.exports = routesLoader;
