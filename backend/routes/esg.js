const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ESG = require("../models/ESG");
const { calculateESGScores } = require("../utils/esgCalculator");

console.log("✅ ESG routes loaded");

// 📩 SUBMIT ESG DATA
router.post("/submit", auth, async (req, res) => {
  console.log("🔥 /api/esg/submit HIT");
  console.log("📩 BODY:", req.body);

  try {
    const data = req.body;

    // Validate structured input format
    const requiredSections = ['fossilFuel', 'fugitive', 'electricity', 'water', 'waste', 'travel', 'offsets', 'social', 'governance'];
    
    for (const section of requiredSections) {
      if (!data[section]) {
        return res.status(400).json({ 
          message: `Missing required section: ${section}` 
        });
      }
    }

    // Validate fossil fuel inputs
    const fossilFuelFields = ['diesel', 'petrol', 'naturalGas'];
    for (const field of fossilFuelFields) {
      if (data.fossilFuel[field] === undefined || data.fossilFuel[field] === null) {
        return res.status(400).json({ 
          message: `Missing fossil fuel field: ${field}` 
        });
      }
    }

    // Validate other required fields
    const requiredFields = {
      fugitive: ['refrigerantLeakage', 'gasLeakage'],
      electricity: ['consumption', 'renewablePercent', 'gridEmissionFactor'],
      water: ['usage', 'intensity'],
      waste: ['generated', 'recycledPercent'],
      travel: ['businessTravelEmissions'],
      offsets: ['carbonOffsets'],
      social: ['employeeTurnoverPercent', 'injuryRate', 'genderDiversityPercent', 'trainingHoursPerEmployee', 'communityInvestmentPercent'],
      governance: ['boardIndependencePercent', 'auditCommittee', 'antiCorruptionPolicy', 'executivePayRatio', 'shareholderRightsScore']
    };

    for (const [section, fields] of Object.entries(requiredFields)) {
      for (const field of fields) {
        if (data[section][field] === undefined || data[section][field] === null) {
          return res.status(400).json({ 
            message: `Missing ${section} field: ${field}` 
          });
        }
      }
    }

    // 🧮 CALCULATE ESG SCORES USING NEW SYSTEM
    const scores = calculateESGScores(data);

    // Create ESG record with structured inputs and computed scores
    const esg = new ESG({
      user: req.user,
      
      // Store structured inputs
      fossilFuel: data.fossilFuel,
      fugitive: data.fugitive,
      electricity: data.electricity,
      water: data.water,
      waste: data.waste,
      travel: data.travel,
      offsets: data.offsets,
      social: data.social,
      governance: data.governance,
      
      // Store environmental calculations
      environmentalCalculations: scores.environmentalCalculations,
      
      // Store computed scores
      environmentalScore: scores.environmentalScore,
      socialScore: scores.socialScore,
      governanceScore: scores.governanceScore,
      overallESGScore: scores.overallESGScore
    });

    await esg.save();

    res.status(201).json({
      message: "ESG data submitted successfully",
      scores: {
        environmentalScore: scores.environmentalScore,
        socialScore: scores.socialScore,
        governanceScore: scores.governanceScore,
        overallESGScore: scores.overallESGScore,
      },
      environmentalBreakdown: {
        totalEmissions: scores.environmentalCalculations.totalEmissions,
        netEmissions: scores.environmentalCalculations.netEmissions,
        fossilFuelEmissions: scores.environmentalCalculations.fossilFuelEmissions,
        electricityEmissions: scores.environmentalCalculations.electricityEmissions,
        travelEmissions: scores.environmentalCalculations.travelEmissions,
        fugitiveEmissions: scores.environmentalCalculations.fugitiveEmissions
      }
    });
  } catch (error) {
    console.error("❌ ESG ERROR:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

// 🔹 GET LATEST ESG FOR LOGGED-IN USER
router.get("/latest", auth, async (req, res) => {
  try {
    const latestESG = await ESG.findOne({ user: req.user })
      .sort({ createdAt: -1 });

    if (!latestESG) {
      return res.status(404).json({ message: "No ESG data found" });
    }

    res.json(latestESG);
  } catch (error) {
    console.error("❌ FETCH ESG ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// 📈 ESG TREND (HISTORICAL)
router.get("/trend", auth, async (req, res) => {
  try {
    const records = await ESG.find({ user: req.user })
      .sort({ createdAt: 1 })
      .limit(10);

    const trend = records.map((r) => ({
      date: r.createdAt.toISOString().split("T")[0],
      environmental: r.environmentalScore,
      social: r.socialScore,
      governance: r.governanceScore,
      overall: r.overallESGScore,
    }));

    res.json(trend);
  } catch (err) {
    console.error("❌ TREND ERROR:", err);
    res.status(500).json({ message: "Failed to load trend data" });
  }
});

module.exports = router;
