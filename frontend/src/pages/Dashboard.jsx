import { useEffect, useState } from "react";
import API from "../api/api";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import "./Dashboard.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

import { Bar, Radar, Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

function Dashboard() {
  const [esg, setEsg] = useState(null);
  const [trend, setTrend] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  
  // Theme detection state - must be at the top level
  const [isDarkTheme, setIsDarkTheme] = useState(false); // Simplified - assume light mode for now

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const [esgResponse, trendResponse] = await Promise.all([
          API.get("/esg/latest"),
          API.get("/esg/trend")
        ]);
        
        setEsg(esgResponse.data);
        setTrend(trendResponse.data || []);
      } catch (err) {
        console.error("Dashboard data fetch error:", err);
        
        // Check if it's a 404 (no data) vs actual error
        if (err.response?.status === 404 || err.response?.data?.message?.includes("No ESG data")) {
          // This is a new user with no data - don't set error, leave esg as null
          setEsg(null);
        } else {
          // This is an actual error
          setError("Failed to load ESG data. Please try refreshing the page.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Listen for theme changes - simplified
  useEffect(() => {
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkTheme(theme === 'dark');
  }, []);

  // Chart configurations
  const getChartOptions = (isDarkTheme = false) => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: isDarkTheme ? '#ffffff' : '#374151',
          font: { size: 12, weight: '500' }
        }
      }
    },
    scales: {
      x: {
        ticks: { 
          color: '#374151', // Always dark gray for visibility
          font: { size: 12 }
        }
      },
      y: {
        ticks: { 
          color: '#374151', // Always dark gray for visibility
          font: { size: 12 }
        }
      }
    }
  });

  const getRadarOptions = (isDarkTheme = false) => ({
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        ticks: { display: false },
        pointLabels: {
          color: '#374151',
          font: { size: 12, weight: '500' }
        }
      }
    },
    plugins: {
      legend: { display: false }
    }
  });

  // Loading component
  const LoadingState = () => (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h3 className="loading-text">Loading your ESG dashboard...</h3>
        </div>
      </div>
    </div>
  );

  // Error component
  const ErrorState = ({ message, onRetry }) => (
    <div className="dashboard-page">
      <div className="dashboard-container">
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <h3 className="error-title">Oops! Something went wrong</h3>
          <p className="error-message">{message}</p>
          <button onClick={onRetry} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    </div>
  );

  // Score rating helper
  const getScoreRating = (score) => {
    if (score >= 80) return { label: "Excellent", color: "#4CAF50", bgColor: "rgba(76, 175, 80, 0.1)", trend: "↗️" };
    if (score >= 60) return { label: "Good", color: "#2196F3", bgColor: "rgba(33, 150, 243, 0.1)", trend: "↗️" };
    if (score >= 40) return { label: "Fair", color: "#FF9800", bgColor: "rgba(255, 152, 0, 0.1)", trend: "→" };
    return { label: "Needs Improvement", color: "#f44336", bgColor: "rgba(244, 67, 54, 0.1)", trend: "↘️" };
  };

  // Get individual score ratings
  const getIndividualScoreData = (score, type) => {
    const rating = getScoreRating(score);
    const icons = {
      environmental: "🌱",
      social: "👥", 
      governance: "⚖️"
    };
    return {
      ...rating,
      icon: icons[type]
    };
  };

  if (loading) return <LoadingState />;
  
  if (error) {
    return (
      <>
        <AuthNavbar />
        <ErrorState 
          message={error} 
          onRetry={() => window.location.reload()} 
        />
      </>
    );
  }

  if (!esg) {
    return (
      <>
        <AuthNavbar />
        <div className="dashboard-page">
          <div className="dashboard-container">
            <div className="welcome-state">
              <div className="welcome-icon">📊</div>
              <h3 className="welcome-title">Welcome to Your ESG Dashboard!</h3>
              <p className="welcome-message">
                Get started by submitting your ESG data to see comprehensive analytics and insights.
              </p>
              <button 
                onClick={() => window.location.href = '/esg'} 
                className="cta-button"
              >
                Fill ESG Form
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  /* ================= CHART DATA ================= */

  const barChartData = {
    labels: ["Environmental", "Social", "Governance"],
    datasets: [
      {
        label: "ESG Scores",
        data: [esg.environmentalScore, esg.socialScore, esg.governanceScore],
        backgroundColor: ["#4CAF50", "#2196F3", "#FF9800"],
        borderRadius: 8,
        borderSkipped: false,
      },
    ],
  };

  const radarData = {
    labels: ["Environmental", "Social", "Governance"],
    datasets: [
      {
        label: "ESG Balance",
        data: [esg.environmentalScore, esg.socialScore, esg.governanceScore],
        backgroundColor: "rgba(76,175,80,0.15)",
        borderColor: "#4CAF50",
        borderWidth: 2,
        pointBackgroundColor: "#4CAF50",
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const trendChartData = trend.length > 1 ? {
    labels: trend.map((t) => new Date(t.date).toLocaleDateString()),
    datasets: [
      {
        label: "Overall ESG Score",
        data: trend.map((t) => t.overall),
        borderColor: "#4CAF50",
        backgroundColor: "rgba(76,175,80,0.1)",
        tension: 0.4,
        fill: true,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  } : null;

  const overallRating = getScoreRating(esg.overallESGScore);

  /* ================= JSX ================= */
  return (
    <>
      <AuthNavbar />

      <div className="dashboard-page">
        <div className="dashboard-container">
          <div className="dashboard-header">
            <h2 className="dashboard-title">ESG Performance Dashboard</h2>
            <p className="dashboard-subtitle">
              Track your Environmental, Social, and Governance metrics
            </p>
          </div>

          <div className="overall-card">
            <div className="overall-content">
              <div className="overall-header">
                <h3>Overall ESG Score</h3>
                <div className="score-trend">
                  <span className="trend-icon">{overallRating.trend}</span>
                  <span className="trend-label">Current Performance</span>
                </div>
              </div>
              <div className="score-display">
                <div className="score-circle" style={{ background: overallRating.bgColor, borderColor: overallRating.color }}>
                  <h1 style={{ color: overallRating.color }}>{Math.round(esg.overallESGScore)}</h1>
                  <div className="score-max">/100</div>
                </div>
                <div className="score-info">
                  <div className="score-rating" style={{ color: overallRating.color, background: overallRating.bgColor }}>
                    {overallRating.label}
                  </div>
                  <div className="score-description">
                    {overallRating.label === "Excellent" && "Outstanding ESG performance! Keep up the great work."}
                    {overallRating.label === "Good" && "Strong ESG performance with room for improvement."}
                    {overallRating.label === "Fair" && "Moderate ESG performance. Consider improvement strategies."}
                    {overallRating.label === "Needs Improvement" && "Focus on enhancing your ESG practices."}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="score-grid">
            <div className="score-card environmental">
              <div className="card-header">
                <div className="card-icon">🌱</div>
                <div className="card-trend">
                  <span className="trend-indicator">{getIndividualScoreData(esg.environmentalScore, 'environmental').trend}</span>
                </div>
              </div>
              <div className="card-content">
                <h4>Environmental</h4>
                <div className="score-section">
                  <span className="score" style={{ color: getIndividualScoreData(esg.environmentalScore, 'environmental').color }}>
                    {esg.environmentalScore}
                  </span>
                  <span className="score-label" style={{ color: getIndividualScoreData(esg.environmentalScore, 'environmental').color }}>
                    {getIndividualScoreData(esg.environmentalScore, 'environmental').label}
                  </span>
                </div>
                <div className="score-bar">
                  <div 
                    className="score-fill environmental" 
                    style={{ 
                      width: `${esg.environmentalScore}%`,
                      background: `linear-gradient(90deg, ${getIndividualScoreData(esg.environmentalScore, 'environmental').color}, ${getIndividualScoreData(esg.environmentalScore, 'environmental').color}dd)`
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="score-card social">
              <div className="card-header">
                <div className="card-icon">👥</div>
                <div className="card-trend">
                  <span className="trend-indicator">{getIndividualScoreData(esg.socialScore, 'social').trend}</span>
                </div>
              </div>
              <div className="card-content">
                <h4>Social</h4>
                <div className="score-section">
                  <span className="score" style={{ color: getIndividualScoreData(esg.socialScore, 'social').color }}>
                    {esg.socialScore}
                  </span>
                  <span className="score-label" style={{ color: getIndividualScoreData(esg.socialScore, 'social').color }}>
                    {getIndividualScoreData(esg.socialScore, 'social').label}
                  </span>
                </div>
                <div className="score-bar">
                  <div 
                    className="score-fill social" 
                    style={{ 
                      width: `${esg.socialScore}%`,
                      background: `linear-gradient(90deg, ${getIndividualScoreData(esg.socialScore, 'social').color}, ${getIndividualScoreData(esg.socialScore, 'social').color}dd)`
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="score-card governance">
              <div className="card-header">
                <div className="card-icon">⚖️</div>
                <div className="card-trend">
                  <span className="trend-indicator">{getIndividualScoreData(esg.governanceScore, 'governance').trend}</span>
                </div>
              </div>
              <div className="card-content">
                <h4>Governance</h4>
                <div className="score-section">
                  <span className="score" style={{ color: getIndividualScoreData(esg.governanceScore, 'governance').color }}>
                    {esg.governanceScore}
                  </span>
                  <span className="score-label" style={{ color: getIndividualScoreData(esg.governanceScore, 'governance').color }}>
                    {getIndividualScoreData(esg.governanceScore, 'governance').label}
                  </span>
                </div>
                <div className="score-bar">
                  <div 
                    className="score-fill governance" 
                    style={{ 
                      width: `${esg.governanceScore}%`,
                      background: `linear-gradient(90deg, ${getIndividualScoreData(esg.governanceScore, 'governance').color}, ${getIndividualScoreData(esg.governanceScore, 'governance').color}dd)`
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="charts-grid">
            <div className="chart-box">
              <h3>📊 Score Distribution</h3>
              <div className="chart-container">
                <Bar data={barChartData} options={getChartOptions(isDarkTheme)} />
              </div>
            </div>

            <div className="chart-box">
              <h3>🎯 ESG Balance</h3>
              <div className="chart-container radar-container">
                <Radar data={radarData} options={getRadarOptions(isDarkTheme)} />
              </div>
            </div>
          </div>

          {trendChartData ? (
            <div className="chart-box full-width">
              <h3>📈 ESG Trend Over Time</h3>
              <div className="chart-container">
                <Line data={trendChartData} options={getChartOptions(isDarkTheme)} />
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <div className="empty-icon">📈</div>
              <h3>No Trend Data Available</h3>
              <p>Submit more ESG data over time to see your progress trends.</p>
              <button 
                onClick={() => window.location.href = '/esg'} 
                className="cta-button"
              >
                Submit New Data
              </button>
            </div>
          )}
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Dashboard;
