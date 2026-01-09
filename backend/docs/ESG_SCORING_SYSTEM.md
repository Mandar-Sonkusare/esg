# Enterprise ESG Scoring System Documentation

## Overview
This enterprise-grade ESG scoring system implements granular environmental calculations with sectioned data collection, inspired by real carbon accounting and ESG platforms like CDP, MSCI, and Sustainalytics.

## System Architecture

### 1. Granular Environmental Inputs (Sectioned)

#### Fossil Fuel Section
- **Diesel**: Consumption in liters (Emission factor: 2.68 kg CO2e/L)
- **Petrol**: Consumption in liters (Emission factor: 2.31 kg CO2e/L)
- **Natural Gas**: Consumption in cubic meters (Emission factor: 1.88 kg CO2e/m³)

#### Fugitive Emissions Section
- **Refrigerant Leakage**: Direct emissions in kg CO2e
- **Gas Leakage**: Direct emissions in kg CO2e

#### Electricity Section
- **Consumption**: Total electricity usage in kWh
- **Renewable Percentage**: % of electricity from renewable sources (0-100%)
- **Grid Emission Factor**: Regional grid emission factor in kg CO2e/kWh

#### Water Section
- **Usage**: Total water consumption in cubic meters
- **Intensity**: Water usage per unit output (m³/unit)

#### Waste Section
- **Generated**: Total waste generated in kg
- **Recycled Percentage**: % of waste recycled (0-100%)

#### Travel Section
- **Business Travel Emissions**: Total travel emissions in kg CO2e

#### Offsets Section
- **Carbon Offsets**: Verified carbon offsets in kg CO2e (mitigation only)

### 2. Environmental Score Calculation Logic

#### Emission Calculations
```javascript
// Fossil Fuel Emissions
fossilFuelEmissions = (diesel × 2.68) + (petrol × 2.31) + (naturalGas × 1.88)

// Electricity Emissions
electricityEmissions = consumption × gridFactor × (1 - renewablePercent/100)

// Total Emissions
totalEmissions = fossilFuel + electricity + fugitive + travel

// Net Emissions (after offsets)
netEmissions = max(0, totalEmissions - min(offsets, totalEmissions))
```

#### Scoring Methodology
- **Higher emissions = Lower score** (normalized 0-100)
- **Recycling, renewables = Mitigation factors**
- **Offsets reduce impact** but cannot exceed total emissions
- **All scores clamped** to 0-100 range

#### Environmental Score Weights
```javascript
{
  energyAndFuel: 35%,    // Fossil fuel + electricity (highest impact)
  travel: 20%,           // Business travel emissions
  water: 15%,            // Water usage and intensity
  waste: 15%,            // Waste generation and recycling
  fugitive: 15%          // Fugitive emissions
}
```

### 3. Full ESG Calculation

#### Overall ESG Weights
- **Environmental**: 40% (climate focus)
- **Social**: 30% (social responsibility)
- **Governance**: 30% (corporate governance)

#### Social Metrics (30% of overall)
- Employee Turnover % (20% weight)
- Injury Rate per 100 employees (25% weight)
- Gender Diversity % (20% weight)
- Training Hours per Employee (20% weight)
- Community Investment % of revenue (15% weight)

#### Governance Metrics (30% of overall)
- Board Independence % (25% weight)
- Independent Audit Committee (20% weight)
- Anti-Corruption Policy (20% weight)
- Executive Pay Ratio (20% weight)
- Shareholder Rights Score 0-10 (15% weight)

### 4. Data Model Structure

```javascript
{
  // Granular Environmental Sections
  fossilFuel: {
    diesel: Number,        // liters
    petrol: Number,        // liters
    naturalGas: Number     // cubic meters
  },
  
  fugitive: {
    refrigerantLeakage: Number,  // kg CO2e
    gasLeakage: Number          // kg CO2e
  },
  
  electricity: {
    consumption: Number,         // kWh
    renewablePercent: Number,    // %
    gridEmissionFactor: Number   // kg CO2e/kWh
  },
  
  water: {
    usage: Number,      // m³
    intensity: Number   // m³/unit
  },
  
  waste: {
    generated: Number,        // kg
    recycledPercent: Number   // %
  },
  
  travel: {
    businessTravelEmissions: Number  // kg CO2e
  },
  
  offsets: {
    carbonOffsets: Number  // kg CO2e
  },
  
  // Social & Governance (structured)
  social: { ... },
  governance: { ... },
  
  // Derived Environmental Calculations
  environmentalCalculations: {
    fossilFuelEmissions: Number,
    electricityEmissions: Number,
    fugitiveEmissions: Number,
    travelEmissions: Number,
    totalEmissions: Number,
    netEmissions: Number,
    waterImpact: Number,
    wasteImpact: Number
  },
  
  // Final Scores
  environmentalScore: Number,  // 0-100
  socialScore: Number,         // 0-100
  governanceScore: Number,     // 0-100
  overallESGScore: Number      // 0-100
}
```

### 5. Sectioned UI Interface

#### Tab Navigation
- **Fossil Fuel** ⛽: Diesel, petrol, natural gas inputs
- **Fugitive** 💨: Refrigerant and gas leakage
- **Electricity** ⚡: Consumption, renewables, grid factor
- **Water** 💧: Usage and intensity metrics
- **Waste** ♻️: Generation and recycling data
- **Travel** ✈️: Business travel emissions
- **Offsets** 🌳: Carbon offset mitigation
- **Social** 👥: Social performance indicators
- **Governance** ⚖️: Corporate governance metrics

#### User Experience
- **Horizontal tab navigation** with icons and labels
- **Section-specific inputs** with contextual descriptions
- **Real-time validation** and input constraints
- **Responsive design** for mobile and desktop
- **Progress indication** across sections

### 6. API Behavior

#### Submission Endpoint
```http
POST /api/esg/submit
Authorization: Bearer <token>
Content-Type: application/json

{
  "fossilFuel": {
    "diesel": 1500,
    "petrol": 800,
    "naturalGas": 2000
  },
  "fugitive": {
    "refrigerantLeakage": 150,
    "gasLeakage": 75
  },
  "electricity": {
    "consumption": 50000,
    "renewablePercent": 30,
    "gridEmissionFactor": 0.45
  },
  // ... other sections
}
```

#### Response Format
```json
{
  "message": "ESG data submitted successfully",
  "scores": {
    "environmentalScore": 68.5,
    "socialScore": 72.1,
    "governanceScore": 81.3,
    "overallESGScore": 72.8
  },
  "environmentalBreakdown": {
    "totalEmissions": 8420.5,
    "netEmissions": 7920.5,
    "fossilFuelEmissions": 6540.0,
    "electricityEmissions": 1575.0,
    "travelEmissions": 200.0,
    "fugitiveEmissions": 225.0
  }
}
```

### 7. Calculation Engine Features

#### Emission Factors (Industry Standard)
- **Diesel**: 2.68 kg CO2e/liter
- **Petrol**: 2.31 kg CO2e/liter
- **Natural Gas**: 1.88 kg CO2e/m³
- **Grid Electricity**: Configurable by region

#### Normalization Benchmarks
- **Fossil Fuel Emissions**: 0-50,000 kg CO2e
- **Electricity Emissions**: 0-100,000 kg CO2e
- **Travel Emissions**: 0-25,000 kg CO2e
- **Water Usage**: 0-10,000 m³
- **Waste Generation**: 0-100,000 kg

#### Mitigation Logic
- **Offsets cannot exceed total emissions**
- **Renewable energy reduces electricity emissions**
- **Recycling improves waste scores**
- **Offset bonus up to 10% for significant mitigation**

### 8. Enterprise Features

#### Data Integrity
- **Server-side calculations only** (no client-side logic exposure)
- **Comprehensive validation** of all input sections
- **Structured data storage** for audit trails
- **Timestamped records** for historical analysis

#### Scalability
- **Modular calculation engine** for easy extension
- **Section-based data model** for granular analysis
- **Weighted scoring system** for flexible prioritization
- **Benchmark-based normalization** for industry comparison

#### Compliance Alignment
- **GHG Protocol** methodology for emissions
- **CDP** reporting framework compatibility
- **TCFD** climate risk assessment support
- **EU Taxonomy** alignment for sustainable activities

### 9. Future Enhancements

#### Planned Features
- **Scope 3 emissions** calculation
- **Industry-specific benchmarks** and peer comparison
- **Automated data integration** from IoT sensors
- **AI-powered insights** and recommendations
- **Regulatory reporting** automation
- **Third-party verification** workflows

#### Technical Roadmap
- **Real-time emissions monitoring** dashboard
- **Predictive analytics** for ESG performance
- **Supply chain integration** for comprehensive scoring
- **Blockchain verification** for offset authenticity
- **API ecosystem** for third-party integrations

This enterprise-grade system provides the foundation for comprehensive ESG management, matching the sophistication of leading carbon accounting and ESG platforms while maintaining extensibility for future enhancements.