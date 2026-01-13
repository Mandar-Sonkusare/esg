import { useState, useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import { LoadingSpinner } from "../components/LoadingComponents";
import "./Analytics.css";

function Analytics() {
  const [activeTab, setActiveTab] = useState("trends");
  const [loading, setLoading] = useState(true);
  const [esgData, setEsgData] = useState(null);

  // Mock data for demonstration
  const mockHistoricalData = [
    { year: 2020, environmental: 65, social: 72, governance: 68, overall: 68 },
    { year: 2021, environmental: 70, social: 75, governance: 71, overall: 72 },
    { year: 2022, environmental: 75, social: 78, governance: 74, overall: 76 },
    { year: 2023, environmental: 78, social: 80, governance: 77, overall: 78 },
    { year: 2024, environmental: 82, social: 83, governance: 80, overall: 82 }
  ];

  const industryComparison = {
    technology: { avg: 72, top25: 85, top10: 92 },
    finance: { avg: 68, top25: 82, top10: 89 },
    healthcare: { avg: 75, top25: 87, top10: 94 },
    energy: { avg: 58, top25: 75, top10: 85 },
    manufacturing: { avg: 64, top25: 78, top10: 88 }
  };

  const riskAssessment = [
    {
      category: "Climate Risk",
      level: "Medium",
      score: 65,
      description: "Moderate exposure to climate-related risks",
      recommendations: ["Implement carbon reduction strategy", "Assess physical climate risks"]
    },
    {
      category: "Regulatory Risk",
      level: "Low",
      score: 85,
      description: "Strong compliance with current regulations",
      recommendations: ["Monitor upcoming ESG regulations", "Enhance disclosure practices"]
    },
    {
      category: "Reputational Risk",
      level: "Low",
      score: 78,
      description: "Good stakeholder perception",
      recommendations: ["Maintain transparency", "Engage with stakeholders regularly"]
    },
    {
      category: "Operational Risk",
      level: "Medium",
      score: 70,
      description: "Some operational ESG challenges",
      recommendations: ["Improve supply chain monitoring", "Enhance employee training"]
    }
  ];

  const improvements = [
    {
      category: "Environmental",
      priority: "High",
      action: "Implement renewable energy transition",
      impact: "15-20 point improvement",
      timeline: "12-18 months",
      cost: "High",
      roi: "3-5 years"
    },
    {
      category: "Social",
      priority: "Medium",
      action: "Enhance diversity & inclusion programs",
      impact: "8-12 point improvement",
      timeline: "6-12 months",
      cost: "Medium",
      roi: "2-3 years"
    },
    {
      category: "Governance",
      priority: "Medium",
      action: "Strengthen board independence",
      impact: "5-8 point improvement",
      timeline: "3-6 months",
      cost: "Low",
      roi: "1-2 years"
    },
    {
      category: "Environmental",
      priority: "High",
      action: "Implement circular economy practices",
      impact: "10-15 point improvement",
      timeline: "18-24 months",
      cost: "High",
      roi: "4-6 years"
    }
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const calculateROI = (investment, timeframe, esgImprovement) => {
    // Simplified ROI calculation based on ESG improvement
    const baseReturn = investment * 0.15; // 15% base return
    const esgBonus = (esgImprovement / 100) * investment * 0.25; // ESG bonus
    const totalReturn = baseReturn + esgBonus;
    const annualROI = (totalReturn / investment) * 100;
    return annualROI.toFixed(1);
  };

  if (loading) {
    return (
      <>
        <AuthNavbar />
        <div className="analytics-loading">
          <LoadingSpinner size="large" />
          <p>Loading analytics data...</p>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <AuthNavbar />
      
      <div className="analytics-page">
        <div className="analytics-container">
          <div className="analytics-header">
            <h1 className="analytics-title">ESG Analytics & Insights</h1>
            <p className="analytics-subtitle">
              Deep dive into your ESG performance with advanced analytics and actionable insights
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="analytics-nav">
            <button 
              className={`nav-tab ${activeTab === 'trends' ? 'active' : ''}`}
              onClick={() => setActiveTab('trends')}
            >
              📈 Historical Trends
            </button>
            <button 
              className={`nav-tab ${activeTab === 'comparison' ? 'active' : ''}`}
              onClick={() => setActiveTab('comparison')}
            >
              🏆 Peer Comparison
            </button>
            <button 
              className={`nav-tab ${activeTab === 'recommendations' ? 'active' : ''}`}
              onClick={() => setActiveTab('recommendations')}
            >
              💡 Recommendations
            </button>
            <button 
              className={`nav-tab ${activeTab === 'risk' ? 'active' : ''}`}
              onClick={() => setActiveTab('risk')}
            >
              ⚠️ Risk Assessment
            </button>
            <button 
              className={`nav-tab ${activeTab === 'roi' ? 'active' : ''}`}
              onClick={() => setActiveTab('roi')}
            >
              💰 ROI Calculator
            </button>
          </div>

          {/* Content Sections */}
          <div className="analytics-content">
            
            {/* Historical Trends */}
            {activeTab === 'trends' && (
              <div className="content-section">
                <h2 className="section-title">Historical ESG Performance</h2>
                <p className="section-description">
                  Track your ESG performance evolution over the past 5 years
                </p>
                
                <div className="trends-container">
                  <div className="trends-chart">
                    <div className="chart-header">
                      <h3>ESG Score Progression</h3>
                      <div className="chart-legend">
                        <span className="legend-item environmental">Environmental</span>
                        <span className="legend-item social">Social</span>
                        <span className="legend-item governance">Governance</span>
                        <span className="legend-item overall">Overall</span>
                      </div>
                    </div>
                    
                    <div className="chart-area">
                      {mockHistoricalData.map((data, index) => (
                        <div key={data.year} className="chart-year">
                          <div className="year-label">{data.year}</div>
                          <div className="score-bars">
                            <div 
                              className="score-bar environmental" 
                              style={{ height: `${data.environmental}%` }}
                              title={`Environmental: ${data.environmental}`}
                            >
                              <span className="score-value">{data.environmental}</span>
                            </div>
                            <div 
                              className="score-bar social" 
                              style={{ height: `${data.social}%` }}
                              title={`Social: ${data.social}`}
                            >
                              <span className="score-value">{data.social}</span>
                            </div>
                            <div 
                              className="score-bar governance" 
                              style={{ height: `${data.governance}%` }}
                              title={`Governance: ${data.governance}`}
                            >
                              <span className="score-value">{data.governance}</span>
                            </div>
                            <div 
                              className="score-bar overall" 
                              style={{ height: `${data.overall}%` }}
                              title={`Overall: ${data.overall}`}
                            >
                              <span className="score-value">{data.overall}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="trends-insights">
                    <h3>Key Insights</h3>
                    <div className="insight-cards">
                      <div className="insight-card positive">
                        <div className="insight-icon">📈</div>
                        <div className="insight-content">
                          <h4>Strong Growth Trajectory</h4>
                          <p>20.6% overall improvement since 2020</p>
                        </div>
                      </div>
                      <div className="insight-card positive">
                        <div className="insight-icon">🌱</div>
                        <div className="insight-content">
                          <h4>Environmental Leadership</h4>
                          <p>26% improvement in environmental score</p>
                        </div>
                      </div>
                      <div className="insight-card neutral">
                        <div className="insight-icon">⚖️</div>
                        <div className="insight-content">
                          <h4>Governance Opportunity</h4>
                          <p>Slowest growth area - focus needed</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Peer Comparison */}
            {activeTab === 'comparison' && (
              <div className="content-section">
                <h2 className="section-title">Industry Benchmarking</h2>
                <p className="section-description">
                  See how your ESG performance compares to industry peers and leaders
                </p>
                
                <div className="comparison-container">
                  <div className="current-score-card">
                    <h3>Your Current Score</h3>
                    <div className="score-display">
                      <span className="score-number">82</span>
                      <span className="score-label">Overall ESG Score</span>
                    </div>
                    <div className="score-breakdown">
                      <div className="breakdown-item">
                        <span className="breakdown-label">Environmental</span>
                        <span className="breakdown-score">82</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Social</span>
                        <span className="breakdown-score">83</span>
                      </div>
                      <div className="breakdown-item">
                        <span className="breakdown-label">Governance</span>
                        <span className="breakdown-score">80</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="industry-benchmarks">
                    <h3>Industry Comparison</h3>
                    {Object.entries(industryComparison).map(([industry, data]) => (
                      <div key={industry} className="benchmark-row">
                        <div className="industry-name">
                          {industry.charAt(0).toUpperCase() + industry.slice(1)}
                        </div>
                        <div className="benchmark-bars">
                          <div className="benchmark-bar">
                            <span className="bar-label">Avg</span>
                            <div className="bar-container">
                              <div 
                                className="bar-fill avg" 
                                style={{ width: `${data.avg}%` }}
                              ></div>
                              <span className="bar-value">{data.avg}</span>
                            </div>
                          </div>
                          <div className="benchmark-bar">
                            <span className="bar-label">Top 25%</span>
                            <div className="bar-container">
                              <div 
                                className="bar-fill top25" 
                                style={{ width: `${data.top25}%` }}
                              ></div>
                              <span className="bar-value">{data.top25}</span>
                            </div>
                          </div>
                          <div className="benchmark-bar">
                            <span className="bar-label">Top 10%</span>
                            <div className="bar-container">
                              <div 
                                className="bar-fill top10" 
                                style={{ width: `${data.top10}%` }}
                              ></div>
                              <span className="bar-value">{data.top10}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Recommendations */}
            {activeTab === 'recommendations' && (
              <div className="content-section">
                <h2 className="section-title">AI-Powered Improvement Recommendations</h2>
                <p className="section-description">
                  Actionable strategies to enhance your ESG performance based on data analysis
                </p>
                
                <div className="recommendations-container">
                  {improvements.map((item, index) => (
                    <div key={index} className="recommendation-card">
                      <div className="recommendation-header">
                        <div className="recommendation-info">
                          <h3 className="recommendation-title">{item.action}</h3>
                          <span className={`category-badge ${item.category.toLowerCase()}`}>
                            {item.category}
                          </span>
                        </div>
                        <div className="recommendation-badges">
                          <span className={`priority-badge priority-${item.priority.toLowerCase()}`}>
                            {item.priority} Priority
                          </span>
                        </div>
                      </div>
                      
                      <div className="recommendation-content">
                        <div className="recommendation-metrics">
                          <div className="metric-item">
                            <span className="metric-label">Expected Impact</span>
                            <span className="metric-value impact">{item.impact}</span>
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">Timeline</span>
                            <span className="metric-value">{item.timeline}</span>
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">Investment</span>
                            <span className={`metric-value cost-${item.cost.toLowerCase()}`}>
                              {item.cost}
                            </span>
                          </div>
                          <div className="metric-item">
                            <span className="metric-label">ROI Timeline</span>
                            <span className="metric-value">{item.roi}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Risk Assessment */}
            {activeTab === 'risk' && (
              <div className="content-section">
                <h2 className="section-title">ESG Risk Assessment</h2>
                <p className="section-description">
                  Comprehensive analysis of ESG-related risks and mitigation strategies
                </p>
                
                <div className="risk-container">
                  <div className="risk-overview">
                    <h3>Risk Overview</h3>
                    <div className="risk-summary">
                      <div className="risk-level-card low">
                        <span className="risk-count">2</span>
                        <span className="risk-label">Low Risk</span>
                      </div>
                      <div className="risk-level-card medium">
                        <span className="risk-count">2</span>
                        <span className="risk-label">Medium Risk</span>
                      </div>
                      <div className="risk-level-card high">
                        <span className="risk-count">0</span>
                        <span className="risk-label">High Risk</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="risk-details">
                    {riskAssessment.map((risk, index) => (
                      <div key={index} className="risk-card">
                        <div className="risk-header">
                          <h4 className="risk-category">{risk.category}</h4>
                          <div className="risk-indicators">
                            <span className={`risk-level ${risk.level.toLowerCase()}`}>
                              {risk.level} Risk
                            </span>
                            <div className="risk-score">
                              <span className="score-number">{risk.score}</span>
                              <span className="score-max">/100</span>
                            </div>
                          </div>
                        </div>
                        
                        <p className="risk-description">{risk.description}</p>
                        
                        <div className="risk-recommendations">
                          <h5>Recommended Actions:</h5>
                          <ul>
                            {risk.recommendations.map((rec, idx) => (
                              <li key={idx}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ROI Calculator */}
            {activeTab === 'roi' && (
              <div className="content-section">
                <h2 className="section-title">ESG Investment ROI Calculator</h2>
                <p className="section-description">
                  Calculate the financial impact and return on investment for ESG improvements
                </p>
                
                <div className="roi-container">
                  <div className="roi-calculator">
                    <h3>Investment Scenarios</h3>
                    <div className="scenario-cards">
                      <div className="scenario-card">
                        <h4>Renewable Energy Transition</h4>
                        <div className="scenario-details">
                          <div className="detail-row">
                            <span>Initial Investment:</span>
                            <span className="value">$2,500,000</span>
                          </div>
                          <div className="detail-row">
                            <span>ESG Score Improvement:</span>
                            <span className="value">+18 points</span>
                          </div>
                          <div className="detail-row">
                            <span>Annual Savings:</span>
                            <span className="value">$450,000</span>
                          </div>
                          <div className="detail-row">
                            <span>Payback Period:</span>
                            <span className="value">5.6 years</span>
                          </div>
                          <div className="detail-row highlight">
                            <span>10-Year ROI:</span>
                            <span className="value">
                              {calculateROI(2500000, 10, 18)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="scenario-card">
                        <h4>Comprehensive D&I Program</h4>
                        <div className="scenario-details">
                          <div className="detail-row">
                            <span>Initial Investment:</span>
                            <span className="value">$800,000</span>
                          </div>
                          <div className="detail-row">
                            <span>ESG Score Improvement:</span>
                            <span className="value">+12 points</span>
                          </div>
                          <div className="detail-row">
                            <span>Productivity Gains:</span>
                            <span className="value">$320,000/year</span>
                          </div>
                          <div className="detail-row">
                            <span>Payback Period:</span>
                            <span className="value">2.5 years</span>
                          </div>
                          <div className="detail-row highlight">
                            <span>10-Year ROI:</span>
                            <span className="value">
                              {calculateROI(800000, 10, 12)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="scenario-card">
                        <h4>Supply Chain Optimization</h4>
                        <div className="scenario-details">
                          <div className="detail-row">
                            <span>Initial Investment:</span>
                            <span className="value">$1,200,000</span>
                          </div>
                          <div className="detail-row">
                            <span>ESG Score Improvement:</span>
                            <span className="value">+15 points</span>
                          </div>
                          <div className="detail-row">
                            <span>Risk Reduction Value:</span>
                            <span className="value">$280,000/year</span>
                          </div>
                          <div className="detail-row">
                            <span>Payback Period:</span>
                            <span className="value">4.3 years</span>
                          </div>
                          <div className="detail-row highlight">
                            <span>10-Year ROI:</span>
                            <span className="value">
                              {calculateROI(1200000, 10, 15)}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="roi-benefits">
                    <h3>Additional Benefits</h3>
                    <div className="benefits-grid">
                      <div className="benefit-item">
                        <div className="benefit-icon">💰</div>
                        <h4>Cost Savings</h4>
                        <p>Reduced operational costs through efficiency improvements</p>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-icon">📈</div>
                        <h4>Revenue Growth</h4>
                        <p>Access to ESG-focused customers and markets</p>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-icon">🛡️</div>
                        <h4>Risk Mitigation</h4>
                        <p>Reduced regulatory and reputational risks</p>
                      </div>
                      <div className="benefit-item">
                        <div className="benefit-icon">💼</div>
                        <h4>Capital Access</h4>
                        <p>Better access to sustainable financing options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}

export default Analytics;