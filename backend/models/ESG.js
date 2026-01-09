const mongoose = require("mongoose");

const ESGSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    electricityUsage: Number,
    fuelConsumption: Number,
    wasteGenerated: Number,
    renewableEnergy: Boolean,

    totalEmployees: Number,
    femaleEmployeesPercent: Number,
    trainingHours: Number,

    policiesAvailable: Boolean,
    complianceStatus: Boolean,

    environmentalScore: Number,
    socialScore: Number,
    governanceScore: Number,
    overallESGScore: Number,
      createdAt: {
    type: Date,
    default: Date.now,
  },
  },
  { timestamps: true }
);

// 🔥 THIS LINE IS CRITICAL
module.exports = mongoose.model("ESG", ESGSchema);
