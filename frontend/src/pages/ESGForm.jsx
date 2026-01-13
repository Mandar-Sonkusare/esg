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
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
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

  // Validation rules
  const validationRules = {
    carbonEmissions: { min: 0, max: 100000, required: false, label: "Carbon Emissions" },
    renewableEnergy: { min: 0, max: 100, required: false, label: "Renewable Energy %" },
    waterUsage: { min: 0, max: 50000, required: false, label: "Water Usage" },
    wasteRecycled: { min: 0, max: 100, required: false, label: "Waste Recycled %" },
    environmentalFines: { min: 0, max: 10000000, required: false, label: "Environmental Fines" },
    employeeTurnover: { min: 0, max: 100, required: true, label: "Employee Turnover %" },
    injuryRate: { min: 0, max: 50, required: true, label: "Injury Rate" },
    genderDiversity: { min: 0, max: 100, required: true, label: "Gender Diversity %" },
    trainingHours: { min: 0, max: 200, required: true, label: "Training Hours" },
    communityInvestment: { min: 0, max: 20, required: true, label: "Community Investment %" },
    boardIndependence: { min: 0, max: 100, required: true, label: "Board Independence %" },
    executivePayRatio: { min: 1, max: 1000, required: true, label: "Executive Pay Ratio" },
    shareholderRights: { min: 0, max: 10, required: true, label: "Shareholder Rights Score" },
  };

  // Validate individual field
  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return null;

    // Check if required field is empty
    if (rules.required && (!value || value.toString().trim() === "")) {
      return `${rules.label} is required`;
    }

    // Skip validation for empty optional fields
    if (!rules.required && (!value || value.toString().trim() === "")) {
      return null;
    }

    const numValue = parseFloat(value);

    // Check if it's a valid number
    if (isNaN(numValue)) {
      return `${rules.label} must be a valid number`;
    }

    // Check min/max bounds
    if (numValue < rules.min) {
      return `${rules.label} must be at least ${rules.min}`;
    }

    if (numValue > rules.max) {
      return `${rules.label} must not exceed ${rules.max}`;
    }

    return null;
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    let hasErrors = false;

    Object.keys(validationRules).forEach(field => {
      const error = validateField(field, form[field]);
      if (error) {
        newErrors[field] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  // Check if form is valid for submit button
  const isFormValid = () => {
    // Check required fields
    const requiredFields = Object.keys(validationRules).filter(
      field => validationRules[field].required
    );

    const hasRequiredFields = requiredFields.every(field => {
      const value = form[field];
      return value && value.toString().trim() !== "";
    });

    // Check if there are any errors
    const hasNoErrors = Object.keys(errors).length === 0;

    return hasRequiredFields && hasNoErrors;
  };

  // Input component with validation
  const ValidatedInput = ({ name, placeholder, type = "number", required = false }) => {
    const hasError = errors[name] && touched[name];
    const isRequired = validationRules[name]?.required;
    
    return (
      <div className="input-wrapper">
        <input
          name={name}
          type={type}
          placeholder={placeholder}
          value={form[name]}
          onChange={handleChange}
          onBlur={() => setTouched({ ...touched, [name]: true })}
          className={`input ${hasError ? 'input-error' : ''} ${isRequired ? 'input-required' : ''}`}
          min={validationRules[name]?.min}
          max={validationRules[name]?.max}
        />
        {hasError && (
          <span className="error-message">
            <span className="error-icon">⚠️</span>
            {errors[name]}
          </span>
        )}
        {isRequired && !hasError && (
          <span className="required-indicator">* Required</span>
        )}
      </div>
    );
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    
    setForm({
      ...form,
      [name]: newValue,
    });

    // Mark field as touched
    setTouched({
      ...touched,
      [name]: true,
    });

    // Validate field in real-time
    if (type !== "checkbox") {
      const error = validateField(name, newValue);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  };

  const handleSubmit = async () => {
    // Validate form before submission
    if (!validateForm()) {
      showError(
        "Validation Error",
        "Please fix the errors in the form before submitting."
      );
      return;
    }

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

          {/* Form Progress Indicator */}
          <div className="form-progress">
            <div className="progress-info">
              <span className="progress-label">Form Completion</span>
              <span className="progress-percentage">
                {Math.round((Object.keys(validationRules).filter(field => 
                  form[field] && form[field].toString().trim() !== ""
                ).length / Object.keys(validationRules).length) * 100)}%
              </span>
            </div>
            <div className="progress-bar-container">
              <div 
                className="progress-bar-fill"
                style={{
                  width: `${(Object.keys(validationRules).filter(field => 
                    form[field] && form[field].toString().trim() !== ""
                  ).length / Object.keys(validationRules).length) * 100}%`
                }}
              ></div>
            </div>
            <div className="progress-status">
              {isFormValid() ? (
                <span className="status-ready">✅ Ready to submit</span>
              ) : (
                <span className="status-incomplete">
                  📝 {Object.keys(validationRules).filter(field => 
                    validationRules[field].required && (!form[field] || form[field].toString().trim() === "")
                  ).length} required fields remaining
                </span>
              )}
            </div>
          </div>

          {/* Environmental Section */}
          <div className="section environmental-section">
            <h3 className="section-title">
              <span className="section-icon">🌱</span>
              Environmental Metrics
            </h3>
            <div className="inputs-grid">
              <ValidatedInput
                name="carbonEmissions"
                placeholder="Carbon Emissions (tons)"
              />
              <ValidatedInput
                name="renewableEnergy"
                placeholder="Renewable Energy %"
              />
              <ValidatedInput
                name="waterUsage"
                placeholder="Water Usage (m³)"
              />
              <ValidatedInput
                name="wasteRecycled"
                placeholder="Waste Recycled %"
              />
              <ValidatedInput
                name="environmentalFines"
                placeholder="Environmental Fines $"
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
              <ValidatedInput
                name="employeeTurnover"
                placeholder="Employee Turnover %"
                required
              />
              <ValidatedInput
                name="injuryRate"
                placeholder="Injury Rate (per 100)"
                required
              />
              <ValidatedInput
                name="genderDiversity"
                placeholder="Gender Diversity %"
                required
              />
              <ValidatedInput
                name="trainingHours"
                placeholder="Training Hours per Employee"
                required
              />
              <ValidatedInput
                name="communityInvestment"
                placeholder="Community Investment %"
                required
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
              <ValidatedInput
                name="boardIndependence"
                placeholder="Board Independence %"
                required
              />
              <ValidatedInput
                name="executivePayRatio"
                placeholder="Executive Pay Ratio"
                required
              />
              <ValidatedInput
                name="shareholderRights"
                placeholder="Shareholder Rights (0-10)"
                required
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
            disabled={loading || !isFormValid()}
            className={`submit-btn ${!isFormValid() ? 'submit-btn-disabled' : ''}`}
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
