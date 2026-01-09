import { useState } from "react";
import API from "../api/api";
import Navbar from "../components/Navbar";
import "./ESGForm.css";

function ESGForm() {
  const [form, setForm] = useState({
    electricityUsage: "",
    fuelConsumption: "",
    wasteGenerated: "",
    renewableEnergy: false,
    totalEmployees: "",
    femaleEmployeesPercent: "",
    trainingHours: "",
    policiesAvailable: false,
    complianceStatus: false,
  });

  const [loading, setLoading] = useState(false);

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
      await API.post("/esg/submit", {
        ...form,
        electricityUsage: Number(form.electricityUsage),
        fuelConsumption: Number(form.fuelConsumption),
        wasteGenerated: Number(form.wasteGenerated),
        totalEmployees: Number(form.totalEmployees),
        femaleEmployeesPercent: Number(form.femaleEmployeesPercent),
        trainingHours: Number(form.trainingHours),
      });

      alert("ESG data submitted successfully 🎉");

      // Reset form after successful submission
      setForm({
        electricityUsage: "",
        fuelConsumption: "",
        wasteGenerated: "",
        renewableEnergy: false,
        totalEmployees: "",
        femaleEmployeesPercent: "",
        trainingHours: "",
        policiesAvailable: false,
        complianceStatus: false,
      });
    } catch (error) {
      alert("ESG submission failed");
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
          <h2 className="esg-title">ESG Data Submission</h2>

          <div className="form-card">
            <div className="section">
              <h3 className="section-title">🌱 Environmental Metrics</h3>
              <div className="input-group">
                <input
                  name="electricityUsage"
                  placeholder="Electricity Usage (kWh)"
                  value={form.electricityUsage}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  name="fuelConsumption"
                  placeholder="Fuel Consumption (L)"
                  value={form.fuelConsumption}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  name="wasteGenerated"
                  placeholder="Waste Generated (kg)"
                  value={form.wasteGenerated}
                  onChange={handleChange}
                  className="form-input"
                />
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="renewableEnergy"
                    checked={form.renewableEnergy}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="checkbox-text">Uses Renewable Energy</span>
                </label>
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">👥 Social Metrics</h3>
              <div className="input-group">
                <input
                  name="totalEmployees"
                  placeholder="Total Employees"
                  value={form.totalEmployees}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  name="femaleEmployeesPercent"
                  placeholder="Female Employees %"
                  value={form.femaleEmployeesPercent}
                  onChange={handleChange}
                  className="form-input"
                />
                <input
                  name="trainingHours"
                  placeholder="Training Hours per Employee"
                  value={form.trainingHours}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            </div>

            <div className="section">
              <h3 className="section-title">⚖️ Governance Metrics</h3>
              <div className="input-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="policiesAvailable"
                    checked={form.policiesAvailable}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="checkbox-text">ESG Policies Available</span>
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    name="complianceStatus"
                    checked={form.complianceStatus}
                    onChange={handleChange}
                    className="form-checkbox"
                  />
                  <span className="checkbox-text">
                    Regulatory Compliance Met
                  </span>
                </label>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="submit-button"
            >
              {loading ? "Submitting..." : "Submit ESG Data"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ESGForm;
