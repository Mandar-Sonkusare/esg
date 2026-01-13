import "./LoadingComponents.css";

// Skeleton Card Component
export function SkeletonCard({ height = "200px", className = "" }) {
  return (
    <div className={`skeleton-card ${className}`} style={{ height }}>
      <div className="skeleton-header">
        <div className="skeleton-circle"></div>
        <div className="skeleton-lines">
          <div className="skeleton-line skeleton-line-title"></div>
          <div className="skeleton-line skeleton-line-subtitle"></div>
        </div>
      </div>
      <div className="skeleton-content">
        <div className="skeleton-line skeleton-line-full"></div>
        <div className="skeleton-line skeleton-line-medium"></div>
        <div className="skeleton-line skeleton-line-small"></div>
      </div>
    </div>
  );
}

// Skeleton Score Card Component
export function SkeletonScoreCard() {
  return (
    <div className="skeleton-score-card">
      <div className="skeleton-score-header">
        <div className="skeleton-icon"></div>
        <div className="skeleton-trend"></div>
      </div>
      <div className="skeleton-score-content">
        <div className="skeleton-line skeleton-line-title"></div>
        <div className="skeleton-score-number"></div>
        <div className="skeleton-progress-bar">
          <div className="skeleton-progress-fill"></div>
        </div>
      </div>
    </div>
  );
}

// Skeleton Chart Component
export function SkeletonChart({ height = "300px" }) {
  return (
    <div className="skeleton-chart" style={{ height }}>
      <div className="skeleton-chart-title"></div>
      <div className="skeleton-chart-content">
        <div className="skeleton-chart-bars">
          <div className="skeleton-bar" style={{ height: "60%" }}></div>
          <div className="skeleton-bar" style={{ height: "80%" }}></div>
          <div className="skeleton-bar" style={{ height: "45%" }}></div>
          <div className="skeleton-bar" style={{ height: "90%" }}></div>
          <div className="skeleton-bar" style={{ height: "70%" }}></div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Loading Spinner
export function LoadingSpinner({ size = "48px", message = "Loading..." }) {
  return (
    <div className="loading-spinner-container">
      <div className="loading-spinner-modern" style={{ width: size, height: size }}>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </div>
      {message && <p className="loading-message">{message}</p>}
    </div>
  );
}

// Progress Bar Component
export function ProgressBar({ progress = 0, message = "", showPercentage = true }) {
  return (
    <div className="progress-container">
      {message && <p className="progress-message">{message}</p>}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        ></div>
      </div>
      {showPercentage && (
        <span className="progress-percentage">{Math.round(progress)}%</span>
      )}
    </div>
  );
}

// Pulsing Dots Loader
export function PulsingDots({ message = "Processing" }) {
  return (
    <div className="pulsing-dots-container">
      <div className="pulsing-dots">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
      <p className="pulsing-message">{message}</p>
    </div>
  );
}

// Form Loading Overlay
export function FormLoadingOverlay({ message = "Submitting..." }) {
  return (
    <div className="form-loading-overlay">
      <div className="form-loading-content">
        <LoadingSpinner size="32px" />
        <p className="form-loading-message">{message}</p>
      </div>
    </div>
  );
}