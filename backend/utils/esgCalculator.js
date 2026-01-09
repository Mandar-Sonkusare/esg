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
  // Environmental benchmarks for normalization
  emissions: {
    fossilFuel: { min: 0, max: 50000 },      // kg CO2e
    electricity: { min: 0, max: 100000 },    // kg CO2e
    travel: { min: 0, max: 25000 },          // kg CO2e
    fugitive: { min: 0, max: 10000 },        // kg CO2e
  },
  water: {
    usage: { min: 0, max: 10000 },           // m³
    intensity: { min: 0, max: 500 },         // m³/unit
  },
  waste: {
    generated: { min: 0, max: 100000 },      // kg
  },
  
  // Social benchmarks
  social: {
    employeeTurnover: { min: 0, max: 50 },   // %
    injuryRate: { min: 0, max: 20 },         // per 100 employees
    genderDiversity: { min: 0, max: 100 },   // %
    trainingHours: { min: 0, max: 80 },      // hours/employee
    communityInvestment: { min: 0, max: 5 }  // % of revenue
  },
  
  // Governance benchmarks
  governance: {
    boardIndependence: { min: 0, max: 100 }, // %
    executivePayRatio: { min: 1, max: 500 }, // ratio
    shareholderRights: { min: 0, max: 10 }   // score
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
  if (value <= min) return 0;
  if (value >= max) return 100;
  return ((value - min) / (max - min)) * 100;
}

/**
 * Normalize negative metrics (lower = better) to 0-100 scale
 */
function normalizeNegative(value, min, max) {
  if (value <= min) return 100;
  if (value >= max) return 0;
  return ((max - value) / (max - min)) * 100;
}

/**
 * Clamp value between 0 and 100
 */
function clamp(value) {
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
  
  // Apply offset mitigation factor (up to 10% bonus for significant offsets)
  const offsetFactor = Math.min(effectiveOffsets / totalEmissions, 0.5); // Max 50% offset
  const offsetBonus = offsetFactor * 10; // Up to 10 point bonus
  
  const finalScore = clamp(baseScore + offsetBonus);
  
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
  
  return {
    environmentalScore: Math.round(environmentalScore * 100) / 100,
    socialScore: Math.round(socialScore * 100) / 100,
    governanceScore: Math.round(governanceScore * 100) / 100,
    overallESGScore: Math.round(overallESGScore * 100) / 100,
    environmentalCalculations
  };
}

module.exports = {
  calculateESGScores,
  EMISSION_FACTORS,
  BENCHMARKS,
  WEIGHTS
};