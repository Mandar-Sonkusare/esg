import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./ESGForm.css";

function ESGForm() {
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    carbonEmissions: "",
    renewableEnergy: "",
    waterUsage: "",
    wasteRecycled: "",
    environmentalFines: "",
    employeeTurnover: "",
    injuryRate: "",
    genderDiversity: "",
    trainingHours: "",
    communityInvestment: "",
    boardIndependence: "",
    executivePayRatio: "",
    shareholderRights: "",
    auditCommittee: false,
    antiCorruption: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const payload = {
        fossilFuel: {
          diesel: Number(form.carbonEmissions) || 0,
          petrol: 0,
          naturalGas: 0,
        },
        fugitive: {
          refrigerantLeakage: 0,
          gasLeakage: 0,
        },
        electricity: {
          consumption: 0,
          renewablePercent: Number(form.renewableEnergy) || 0,
          gridEmissionFactor: 0.5,
        },
        water: {
          usage: Number(form.waterUsage) || 0,
          intensity: 0,
        },
        waste: {
          generated: 0,
          recycledPercent: Number(form.wasteRecycled) || 0,
        },
        travel: {
          businessTravelEmissions: 0,
        },
        offsets: {
          carbonOffsets: Number(form.environmentalFines) || 0,
        },
        social: {
          employeeTurnoverPercent: Number(form.employeeTurnover),
          injuryRate: Number(form.injuryRate),
          genderDiversityPercent: Number(form.genderDiversity),
          trainingHoursPerEmployee: Number(form.trainingHours),
          communityInvestmentPercent: Number(form.communityInvestment),
        },
        governance: {
          boardIndependencePercent: Number(form.boardIndependence),
          auditCommittee: form.auditCommittee,
          antiCorruptionPolicy: form.antiCorruption,
          executivePayRatio: Number(form.executivePayRatio),
          shareholderRightsScore: Number(form.shareholderRights),
        },
      };

      const response = await API.post("/esg/submit", payload);

      alert(
        `ESG data submitted successfully! 🎉\n\nScores:\n• Environmental: ${response.data.scores.environmentalScore}\n• Social: ${response.data.scores.socialScore}\n• Governance: ${response.data.scores.governanceScore}\n• Overall ESG: ${response.data.scores.overallESGScore}`
      );
    } catch (error) {
      alert(
        "ESG submission failed: " +
          (error.response?.data?.message || error.message)
      );
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="esg-page">
        <div className="esg-container">
          <h2 className="page-title">Comprehensive ESG Data Submission</h2>
          <p className="page-subtitle">
            Submit your organization's Environmental, Social, and Governance
            metrics for professional ESG scoring
          </p>

          {/* Environmental Section */}
          <div className="section">
            <h3 className="section-title">🌱 Environmental Metrics</h3>
            <input
              name="carbonEmissions"
              placeholder="Carbon Emissions (tons)"
              value={form.carbonEmissions}
              onChange={handleChange}
              className="input"
            />
            <input
              name="renewableEnergy"
              placeholder="Renewable Energy %"
              value={form.renewableEnergy}
              onChange={handleChange}
              className="input"
            />
            <input
              name="waterUsage"
              placeholder="Water Usage (m³)"
              value={form.waterUsage}
              onChange={handleChange}
              className="input"
            />
            <input
              name="wasteRecycled"
              placeholder="Waste Recycled %"
              value={form.wasteRecycled}
              onChange={handleChange}
              className="input"
            />
            <input
              name="environmentalFines"
              placeholder="Environmental Fines $"
              value={form.environmentalFines}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Social Section */}
          <div className="section">
            <h3 className="section-title">👥 Social Metrics</h3>
            <input
              name="employeeTurnover"
              placeholder="Employee Turnover %"
              value={form.employeeTurnover}
              onChange={handleChange}
              className="input"
            />
            <input
              name="injuryRate"
              placeholder="Injury Rate (per 100)"
              value={form.injuryRate}
              onChange={handleChange}
              className="input"
            />
            <input
              name="genderDiversity"
              placeholder="Gender Diversity %"
              value={form.genderDiversity}
              onChange={handleChange}
              className="input"
            />
            <input
              name="trainingHours"
              placeholder="Training Hours per Employee"
              value={form.trainingHours}
              onChange={handleChange}
              className="input"
            />
            <input
              name="communityInvestment"
              placeholder="Community Investment %"
              value={form.communityInvestment}
              onChange={handleChange}
              className="input"
            />
          </div>

          {/* Governance Section */}
          <div className="section">
            <h3 className="section-title">⚖️ Governance Metrics</h3>
            <input
              name="boardIndependence"
              placeholder="Board Independence %"
              value={form.boardIndependence}
              onChange={handleChange}
              className="input"
            />
            <input
              name="executivePayRatio"
              placeholder="Executive Pay Ratio"
              value={form.executivePayRatio}
              onChange={handleChange}
              className="input"
            />
            <input
              name="shareholderRights"
              placeholder="Shareholder Rights (0-10)"
              value={form.shareholderRights}
              onChange={handleChange}
              className="input"
            />

            <label className="checkbox">
              <input
                type="checkbox"
                name="auditCommittee"
                checked={form.auditCommittee}
                onChange={handleChange}
              />
              Independent Audit Committee
            </label>
            <label className="checkbox">
              <input
                type="checkbox"
                name="antiCorruption"
                checked={form.antiCorruption}
                onChange={handleChange}
              />
              Anti-Corruption Policy
            </label>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-btn"
          >
            {loading ? "Calculating ESG Scores..." : "Submit ESG Data"}
          </button>
        </div>
      </div>
    </>
  );
}

export default ESGForm;
