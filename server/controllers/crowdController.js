import CrowdReport from "../models/CrowdReport.js"; 
export const createCrowdReport = async (req, res) => { 
  try {
    const {
      location,
      transportType,
      crowdLevel,
      latitude,
      longitude,
    } = req.body;

    const report = await CrowdReport.create({
      location,
      transportType,
      crowdLevel,
      latitude,
      longitude,
      reportedBy: req.user.id,
    });

    const populatedReport = await report.populate(
      "reportedBy",
      "name"
    );

    const io = req.app.get("io");
    io.emit("newCrowdReport", populatedReport);

    res.status(201).json(populatedReport);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to create report",
    });
  }
};

export const getCrowdReports = async (req, res) => { // 👈 Prefixed with export
  try {
    const reports = await CrowdReport.find().populate(
      "reportedBy",
      "name"
    );

    res.json(reports);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to fetch reports",
    });
  }
};