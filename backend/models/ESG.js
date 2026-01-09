const mongoose = require("mongoose");

const ESGSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ===== ENVIRONMENTAL INPUTS (GRANULAR SECTIONS) =====
    
    // Fossil Fuel Section
    fossilFuel: {
      diesel: { type: Number, required: true, default: 0 }, // liters
      petrol: { type: Number, required: true, default: 0 }, // liters
      naturalGas: { type: Number, required: true, default: 0 }, // cubic meters
    },

    // Fugitive Emissions Section
    fugitive: {
      refrigerantLeakage: { type: Number, required: true, default: 0 }, // kg CO2e
      gasLeakage: { type: Number, required: true, default: 0 }, // kg CO2e
    },

    // Electricity Section
    electricity: {
      consumption: { type: Number, required: true, default: 0 }, // kWh
      renewablePercent: { type: Number, required: true, default: 0 }, // % (0-100)
      gridEmissionFactor: { type: Number, required: true, default: 0.5 }, // kg CO2e/kWh
    },

    // Water Section
    water: {
      usage: { type: Number, required: true, default: 0 }, // cubic meters
      intensity: { type: Number, required: true, default: 0 }, // m³ per unit output
    },

    // Waste Section
    waste: {
      generated: { type: Number, required: true, default: 0 }, // kg
      recycledPercent: { type: Number, required: true, default: 0 }, // % (0-100)
    },

    // Travel Section
    travel: {
      businessTravelEmissions: { type: Number, required: true, default: 0 }, // kg CO2e
    },

    // Offsets Section
    offsets: {
      carbonOffsets: { type: Number, required: true, default: 0 }, // kg CO2e
    },

    // ===== SOCIAL INPUTS =====
    social: {
      employeeTurnoverPercent: { type: Number, required: true },
      injuryRate: { type: Number, required: true },
      genderDiversityPercent: { type: Number, required: true },
      trainingHoursPerEmployee: { type: Number, required: true },
      communityInvestmentPercent: { type: Number, required: true },
    },

    // ===== GOVERNANCE INPUTS =====
    governance: {
      boardIndependencePercent: { type: Number, required: true },
      auditCommittee: { type: Boolean, required: true },
      antiCorruptionPolicy: { type: Boolean, required: true },
      executivePayRatio: { type: Number, required: true },
      shareholderRightsScore: { type: Number, required: true },
    },

    // ===== DERIVED ENVIRONMENTAL CALCULATIONS =====
    environmentalCalculations: {
      fossilFuelEmissions: { type: Number }, // kg CO2e
      fugitiveEmissions: { type: Number }, // kg CO2e
      electricityEmissions: { type: Number }, // kg CO2e
      waterImpact: { type: Number }, // normalized score 0-100
      wasteImpact: { type: Number }, // normalized score 0-100
      travelEmissions: { type: Number }, // kg CO2e
      totalEmissions: { type: Number }, // kg CO2e before offsets
      netEmissions: { type: Number }, // kg CO2e after offsets
    },

    // ===== COMPUTED SCORES =====
    environmentalScore: { type: Number }, // 0-100
    socialScore: { type: Number }, // 0-100
    governanceScore: { type: Number }, // 0-100
    overallESGScore: { type: Number }, // 0-100

    // ===== METADATA =====
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ESG", ESGSchema);
