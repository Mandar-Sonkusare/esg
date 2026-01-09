const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const ESG = require("../models/ESG");


// 🔥 DEBUG LOG
console.log("✅ ESG routes loaded");

// 📩 SUBMIT ESG DATA
router.post("/submit", auth, async (req, res) => {

  console.log("🔥 /api/esg/submit HIT");
  console.log("📩 BODY:", req.body);

  try {
    const data = req.body;

    // 🧮 SIMPLE MVP SCORING
    const environmentalScore =
      (data.renewableEnergy ? 30 : 10) +
      (100 - data.wasteGenerated);

    const socialScore =
      (data.femaleEmployeesPercent || 0) +
      (data.trainingHours || 0);

    const governanceScore =
      (data.policiesAvailable ? 50 : 20) +
      (data.complianceStatus ? 50 : 20);

    const overallESGScore =
      environmentalScore * 0.4 +
      socialScore * 0.3 +
      governanceScore * 0.3;

const esg = new ESG({
  ...data,
  user: req.user, // 🔥 MUST BE AFTER spread
  environmentalScore,
  socialScore,
  governanceScore,
  overallESGScore
});



    await esg.save();

    res.status(201).json({
      message: "ESG data submitted successfully",
      scores: {
        environmentalScore,
        socialScore,
        governanceScore,
        overallESGScore,
      },
    });
  } catch (error) {
    console.error("❌ ESG ERROR:", error);
    res.status(500).json({ message: "Server error" });
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
router.get("/trend", auth, async (req, res) => {
  try {
    const records = await ESG.find({ user: req.user })
      .sort({ createdAt: 1 });

    const trend = records.map((r) => ({
      date: r.createdAt.toISOString().split("T")[0],
      environmental: r.environmentalScore,
      social: r.socialScore,
      governance: r.governanceScore,
      overall: r.overallESGScore,
    }));

    res.json(trend);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch ESG trend" });
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
    res.status(500).json({ message: "Failed to load trend data" });
  }
});


module.exports = router;
