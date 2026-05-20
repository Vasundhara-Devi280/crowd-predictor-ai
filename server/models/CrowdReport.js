import mongoose from "mongoose";

const crowdReportSchema = new mongoose.Schema(
  {
    location: {
      type: String,
      required: true,
    },

    transportType: {
      type: String,
      required: true,
    },

    crowdLevel: {
      type: String,
      enum: ["Low", "Medium", "High"],
      required: true,
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const CrowdReport = mongoose.model(
  "CrowdReport",
  crowdReportSchema
);

export default CrowdReport;