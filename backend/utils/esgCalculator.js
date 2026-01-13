/**
 * Enterprise ESG Scoring Calculator
 * Implements granular environmental calculations with sectioned inputs
 * Inspired by real carbon accounting and ESG platforms
 */

// ===== EMISSION FACTORS (kg CO2e) =====

const EMISSION_FACTORS = {
  // Fossil Fuels (kg CO2e per unit)
  diesel: 2.68,        // per liter
  petrol: 2.31,        // per liter
  naturalGas: 1.88,    // per cubic meter
  
  // Default grid emission factor (can be overridden by user input)
  defaultGrid: 0.5,    // kg CO2e per kWh (global average)
};

// ===== NORMALIZATION BENCHMARKS =====

const BENCHMARKS = {
  // Environmental benchmarks for normalization (updated for better scaling)
  emissions: {
    fossilFuel: { min: 0, max: 25000 },       // kg CO2e (reduced from 50000)
    electricity: { min: 0, max: 50000 },      // kg CO2e (reduced from 100000)
    travel: { min: 0, max: 15000 },           // kg CO2e (reduced from 25000)
    fugitive: { min: 0, max: 5000 },          // kg CO2e (reduced from 10000)
  },
  water: {
    usage: { min: 0, max: 5000 },             // m³ (reduced from 10000)
    intensity: { min: 0, max: 100 },          // m³/unit (reduced from 500)
  },
  waste: {
    generated: { min: 0, max: 50000 },        // kg (reduced from 100000)
  },
  
  // Social benchmarks (adjusted for better distribution)
  social: {
    employeeTurnover: { min: 0, max: 30 },    // % (reduced from 50)
    injuryRate: { min: 0, max: 10 },          // per 100 employees (reduced from 20)
    genderDiversity: { min: 20, max: 100 },   // % (increased min from 0)
    trainingHours: { min: 0, max: 60 },       // hours/employee (reduced from 80)
    communityInvestment: { min: 0, max: 3 }   // % of revenue (reduced from 5)
  },
  
  // Governance benchmarks (adjusted for realistic ranges)
  governance: {
    boardIndependence: { min: 30, max: 100 }, // % (increased min from 0)
    executivePayRatio: { min: 1, max: 200 },  // ratio (reduced from 500)
    shareholderRights: { min: 0, max: 10 }    // score (unchanged)
  }
};

// ===== SCORING WEIGHTS =====

const WEIGHTS = {
  // Environmental pillar weights (sum = 1.0)
  environmental: {
    energyAndFuel: 0.35,    // Fossil fuel + electricity
    travel: 0.20,           // Business travel
    water: 0.15,            // Water usage and intensity
    waste: 0.15,            // Waste generation and recycling
    fugitive: 0.15,         // Fugitive emissions
    // Note: Offsets are mitigation, not additive scoring
  },
  
  // Social pillar weights (sum = 1.0)
  social: {
    injuryRate: 0.25,
    employeeTurnover: 0.20,
    genderDiversity: 0.20,
    trainingHours: 0.20,
    communityInvestment: 0.15
  },
  
  // Governance pillar weights (sum = 1.0)
  governance: {
    boardIndependence: 0.25,
    auditCommittee: 0.20,
    antiCorruption: 0.20,
    executivePayRatio: 0.20,
    shareholderRights: 0.15
  },
  
  // Overall ESG weights (sum = 1.0)
  overall: {
    environmental: 0.40,
    social: 0.30,
    governance: 0.30
  }
};

// ===== UTILITY FUNCTIONS =====

/**
 * Normalize positive metrics (higher = better) to 0-100 scale
 */
function normalizePositive(value, min, max) {
  // Handle edge cases
  if (value <= min) return 0;
  if (value >= max) return 100;
  if (max <= min) return 50; // Default to middle if invalid range
  
  const normalized = ((value - min) / (max - min)) * 100;
  return Math.max(0, Math.min(100, normalized)); // Ensure 0-100 range
}

/**
 * Normalize negative metrics (lower = better) to 0-100 scale
 */
function normalizeNegative(value, min, max) {
  // Handle edge cases
  if (value <= min) return 100;
  if (value >= max) return 0;
  if (max <= min) return 50; // Default to middle if invalid range
  
  const normalized = ((max - value) / (max - min)) * 100;
  return Math.max(0, Math.min(100, normalized)); // Ensure 0-100 range
}

/**
 * Clamp value between 0 and 100
 */
function clamp(value) {
  // Handle NaN and invalid values
  if (isNaN(value) || !isFinite(value)) return 0;
  return Math.max(0, Math.min(100, value));
}

// ===== ENVIRONMENTAL CALCULATIONS =====

/**
 * Calculate fossil fuel emissions
 */
function calculateFossilFuelEmissions(fossilFuel) {
  const dieselEmissions = fossilFuel.diesel * EMISSION_FACTORS.diesel;
  const petrolEmissions = fossilFuel.petrol * EMISSION_FACTORS.petrol;
  const gasEmissions = fossilFuel.naturalGas * EMISSION_FACTORS.naturalGas;
  
  return dieselEmissions + petrolEmissions + gasEmissions;
}

/**
 * Calculate electricity emissions
 */
function calculateElectricityEmissions(electricity) {
  const gridFactor = electricity.gridEmissionFactor || EMISSION_FACTORS.defaultGrid;
  const renewableFactor = (100 - electricity.renewablePercent) / 100;
  
  return electricity.consumption * gridFactor * renewableFactor;
}

/**
 * Calculate fugitive emissions
 */
function calculateFugitiveEmissions(fugitive) {
  return fugitive.refrigerantLeakage + fugitive.gasLeakage;
}

/**
 * Calculate water impact score
 */
function calculateWaterImpact(water) {
  const usageScore = normalizeNegative(
    water.usage, 
    BENCHMARKS.water.usage.min, 
    BENCHMARKS.water.usage.max
  );
  
  const intensityScore = normalizeNegative(
    water.intensity, 
    BENCHMARKS.water.intensity.min, 
    BENCHMARKS.water.intensity.max
  );
  
  return (usageScore + intensityScore) / 2;
}

/**
 * Calculate waste impact score
 */
function calculateWasteImpact(waste) {
  const generationScore = normalizeNegative(
    waste.generated, 
    BENCHMARKS.waste.generated.min, 
    BENCHMARKS.waste.generated.max
  );
  
  const recyclingScore = normalizePositive(
    waste.recycledPercent, 
    0, 
    100
  );
  
  // Weight generation more heavily than recycling
  return (generationScore * 0.6) + (recyclingScore * 0.4);
}

/**
 * Calculate environmental score from granular inputs
 */
function calculateEnvironmentalScore(data) {
  // Calculate emissions for each section
  const fossilFuelEmissions = calculateFossilFuelEmissions(data.fossilFuel);
  const electricityEmissions = calculateElectricityEmissions(data.electricity);
  const fugitiveEmissions = calculateFugitiveEmissions(data.fugitive);
  const travelEmissions = data.travel.businessTravelEmissions;
  
  // Calculate total emissions before offsets
  const totalEmissions = fossilFuelEmissions + electricityEmissions + 
                        fugitiveEmissions + travelEmissions;
  
  // Apply offsets (cannot exceed total emissions)
  const effectiveOffsets = Math.min(data.offsets.carbonOffsets, totalEmissions);
  const netEmissions = Math.max(0, totalEmissions - effectiveOffsets);
  
  // Calculate scores for each section (emissions = lower is better)
  const energyFuelScore = normalizeNegative(
    fossilFuelEmissions + electricityEmissions,
    BENCHMARKS.emissions.fossilFuel.min,
    BENCHMARKS.emissions.fossilFuel.max + BENCHMARKS.emissions.electricity.max
  );
  
  const travelScore = normalizeNegative(
    travelEmissions,
    BENCHMARKS.emissions.travel.min,
    BENCHMARKS.emissions.travel.max
  );
  
  const fugitiveScore = normalizeNegative(
    fugitiveEmissions,
    BENCHMARKS.emissions.fugitive.min,
    BENCHMARKS.emissions.fugitive.max
  );
  
  const waterScore = calculateWaterImpact(data.water);
  const wasteScore = calculateWasteImpact(data.waste);
  
  // Calculate weighted environmental score
  const baseScore = 
    energyFuelScore * WEIGHTS.environmental.energyAndFuel +
    travelScore * WEIGHTS.environmental.travel +
    waterScore * WEIGHTS.environmental.water +
    wasteScore * WEIGHTS.environmental.waste +
    fugitiveScore * WEIGHTS.environmental.fugitive;
  
  // Apply offset mitigation factor (improve score proportionally, not additively)
  let finalScore = baseScore;
  if (totalEmissions > 0 && effectiveOffsets > 0) {
    const offsetRatio = effectiveOffsets / totalEmissions;
    // Improve score by up to 15% based on offset ratio, but don't exceed 100
    const offsetImprovement = offsetRatio * 15;
    finalScore = Math.min(100, baseScore + (baseScore * offsetImprovement / 100));
  }
  
  // Ensure score is properly clamped between 0 and 100
  finalScore = clamp(finalScore);
  
  return {
    score: finalScore,
    calculations: {
      fossilFuelEmissions,
      electricityEmissions,
      fugitiveEmissions,
      travelEmissions,
      totalEmissions,
      netEmissions,
      waterImpact: waterScore,
      wasteImpact: wasteScore
    }
  };
}

// ===== SOCIAL CALCULATIONS =====

/**
 * Calculate social score
 */
function calculateSocialScore(social) {
  const turnoverScore = normalizeNegative(
    social.employeeTurnoverPercent,
    BENCHMARKS.social.employeeTurnover.min,
    BENCHMARKS.social.employeeTurnover.max
  );
  
  const injuryScore = normalizeNegative(
    social.injuryRate,
    BENCHMARKS.social.injuryRate.min,
    BENCHMARKS.social.injuryRate.max
  );
  
  const diversityScore = normalizePositive(
    social.genderDiversityPercent,
    BENCHMARKS.social.genderDiversity.min,
    BENCHMARKS.social.genderDiversity.max
  );
  
  const trainingScore = normalizePositive(
    social.trainingHoursPerEmployee,
    BENCHMARKS.social.trainingHours.min,
    BENCHMARKS.social.trainingHours.max
  );
  
  const communityScore = normalizePositive(
    social.communityInvestmentPercent,
    BENCHMARKS.social.communityInvestment.min,
    BENCHMARKS.social.communityInvestment.max
  );
  
  const weightedScore = 
    turnoverScore * WEIGHTS.social.employeeTurnover +
    injuryScore * WEIGHTS.social.injuryRate +
    diversityScore * WEIGHTS.social.genderDiversity +
    trainingScore * WEIGHTS.social.trainingHours +
    communityScore * WEIGHTS.social.communityInvestment;
  
  return clamp(weightedScore);
}

// ===== GOVERNANCE CALCULATIONS =====

/**
 * Calculate governance score
 */
function calculateGovernanceScore(governance) {
  const boardScore = normalizePositive(
    governance.boardIndependencePercent,
    BENCHMARKS.governance.boardIndependence.min,
    BENCHMARKS.governance.boardIndependence.max
  );
  
  const auditScore = governance.auditCommittee ? 100 : 0;
  const corruptionScore = governance.antiCorruptionPolicy ? 100 : 0;
  
  const payRatioScore = normalizeNegative(
    governance.executivePayRatio,
    BENCHMARKS.governance.executivePayRatio.min,
    BENCHMARKS.governance.executivePayRatio.max
  );
  
  const rightsScore = normalizePositive(
    governance.shareholderRightsScore,
    BENCHMARKS.governance.shareholderRights.min,
    BENCHMARKS.governance.shareholderRights.max
  );
  
  const weightedScore = 
    boardScore * WEIGHTS.governance.boardIndependence +
    auditScore * WEIGHTS.governance.auditCommittee +
    corruptionScore * WEIGHTS.governance.antiCorruption +
    payRatioScore * WEIGHTS.governance.executivePayRatio +
    rightsScore * WEIGHTS.governance.shareholderRights;
  
  return clamp(weightedScore);
}

// ===== MAIN CALCULATION FUNCTION =====

/**
 * Calculate comprehensive ESG scores
 */
function calculateESGScores(data) {
  // Calculate environmental score with detailed calculations
  const environmentalResult = calculateEnvironmentalScore(data);
  const environmentalScore = environmentalResult.score;
  const environmentalCalculations = environmentalResult.calculations;
  
  // Calculate social and governance scores
  const socialScore = calculateSocialScore(data.social);
  const governanceScore = calculateGovernanceScore(data.governance);
  
  // Calculate overall ESG score
  const overallESGScore = 
    environmentalScore * WEIGHTS.overall.environmental +
    socialScore * WEIGHTS.overall.social +
    governanceScore * WEIGHTS.overall.governance;
  
  // Ensure all scores are properly clamped and rounded
  return {
    environmentalScore: clamp(Math.round(environmentalScore * 100) / 100),
    socialScore: clamp(Math.round(socialScore * 100) / 100),
    governanceScore: clamp(Math.round(governanceScore * 100) / 100),
    overallESGScore: clamp(Math.round(overallESGScore * 100) / 100),
    environmentalCalculations
  };
}

module.exports = {
  calculateESGScores,
  EMISSION_FACTORS,
  BENCHMARKS,
  WEIGHTS
};