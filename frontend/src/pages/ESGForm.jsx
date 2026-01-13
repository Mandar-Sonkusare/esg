import { useState } from "react";
import API from "../api/api";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import { FormLoadingOverlay, ProgressBar } from "../components/LoadingComponents";
import { SuccessModal, useToast, ToastContainer } from "../components/NotificationSystem";
import "./ESGForm.css";

function ESGForm() {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);
  const { toasts, showError, removeToast } = useToast();

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
      setProgress(0);

      // Simulate progress steps
      setProgress(20);
      await new Promise(resolve => setTimeout(resolve, 300));

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

      setProgress(60);
      await new Promise(resolve => setTimeout(resolve, 500));

      const response = await API.post("/esg/submit", payload);

      setProgress(100);
      await new Promise(resolve => setTimeout(resolve, 300));

      // Store results for success modal
      setSubmissionResult({
        scores: response.data.scores,
        message: "Your ESG data has been successfully processed and scored!"
      });
      setShowSuccessModal(true);
      
    } catch (error) {
      showError(
        "Submission Failed",
        error.response?.data?.message || error.message || "An unexpected error occurred"
      );
      console.error(error);
    } finally {
      setLoading(false);
      setProgress(0);
    }
  };

  return (
    <>
      <AuthNavbar />
      
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      
      {showSuccessModal && submissionResult && (
        <SuccessModal
          isOpen={showSuccessModal}
          title="ESG Submission Successful!"
          message={submissionResult.message}
          details={[
            { label: "Environmental Score", value: `${submissionResult.scores.environmentalScore}/100` },
            { label: "Social Score", value: `${submissionResult.scores.socialScore}/100` },
            { label: "Governance Score", value: `${submissionResult.scores.governanceScore}/100` },
            { label: "Overall ESG Score", value: `${submissionResult.scores.overallESGScore}/100` }
          ]}
          primaryAction={{
            label: "View Dashboard",
            onClick: () => window.location.href = '/dashboard'
          }}
          secondaryAction={{
            label: "Submit Another",
            onClick: () => {
              // Reset form
              setForm({
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
            }
          }}
          onClose={() => setShowSuccessModal(false)}
        />
      )}

      <div className="esg-page">
        <div className="esg-container" style={{ position: 'relative' }}>
          {loading && (
            <FormLoadingOverlay>
              <ProgressBar 
                progress={progress} 
                message="Processing your ESG data..." 
                showPercentage={true}
              />
            </FormLoadingOverlay>
          )}
          
          <h2 className="page-title">Comprehensive ESG Data Submission</h2>
          <p className="page-subtitle">
            Submit your organization's Environmental, Social, and Governance
            metrics for professional ESG scoring
          </p>

          {/* Environmental Section */}
          <div className="section environmental-section">
            <h3 className="section-title">
              <span className="section-icon">🌱</span>
              Environmental Metrics
            </h3>
            <div className="inputs-grid">
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
          </div>

          {/* Social Section */}
          <div className="section social-section">
            <h3 className="section-title">
              <span className="section-icon">👥</span>
              Social Metrics
            </h3>
            <div className="inputs-grid">
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
          </div>

          {/* Governance Section */}
          <div className="section governance-section">
            <h3 className="section-title">
              <span className="section-icon">⚖️</span>
              Governance Metrics
            </h3>
            <div className="inputs-grid">
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
            </div>

            <div className="checkboxes-container">
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="auditCommittee"
                  checked={form.auditCommittee}
                  onChange={handleChange}
                />
                <span className="checkbox-icon">✓</span>
                Independent Audit Committee
              </label>
              <label className="checkbox">
                <input
                  type="checkbox"
                  name="antiCorruption"
                  checked={form.antiCorruption}
                  onChange={handleChange}
                />
                <span className="checkbox-icon">✓</span>
                Anti-Corruption Policy
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="submit-btn"
          >
            <span className="submit-icon">📊</span>
            {loading ? "Calculating ESG Scores..." : "Submit ESG Data"}
          </button>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default ESGForm;
