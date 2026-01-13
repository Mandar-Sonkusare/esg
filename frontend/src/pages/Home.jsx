import { useState, useEffect } from "react";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import "./Home.css";

function Home() {
  const [activeSection, setActiveSection] = useState("what-is-esg");

  const esgPillars = [
    {
      id: "environmental",
      title: "Environmental",
      icon: "🌱",
      color: "#4CAF50",
      description: "Climate impact, resource usage, and environmental stewardship",
      metrics: ["Carbon Emissions", "Renewable Energy", "Water Usage", "Waste Management"]
    },
    {
      id: "social",
      title: "Social",
      icon: "👥",
      color: "#2196F3",
      description: "Employee welfare, community impact, and social responsibility",
      metrics: ["Employee Turnover", "Diversity & Inclusion", "Training Hours", "Community Investment"]
    },
    {
      id: "governance",
      title: "Governance",
      icon: "⚖️",
      color: "#FF9800",
      description: "Corporate ethics, transparency, and responsible management",
      metrics: ["Board Independence", "Executive Compensation", "Anti-Corruption", "Shareholder Rights"]
    }
  ];

  const benefits = [
    {
      icon: "📈",
      title: "Attract Investment",
      description: "ESG-focused funds manage over $30 trillion globally"
    },
    {
      icon: "💰",
      title: "Reduce Costs",
      description: "Energy efficiency and waste reduction lower operational expenses"
    },
    {
      icon: "🛡️",
      title: "Mitigate Risks",
      description: "Proactive ESG management reduces regulatory and reputational risks"
    },
    {
      icon: "🏆",
      title: "Competitive Advantage",
      description: "Strong ESG performance differentiates your business in the market"
    },
    {
      icon: "👨‍💼",
      title: "Talent Retention",
      description: "Employees prefer working for socially responsible companies"
    },
    {
      icon: "🌍",
      title: "Brand Reputation",
      description: "Consumers increasingly choose sustainable brands"
    }
  ];

  const calculationSteps = [
    {
      step: 1,
      title: "Data Collection",
      description: "Gather environmental, social, and governance metrics",
      icon: "📊"
    },
    {
      step: 2,
      title: "Standardization",
      description: "Normalize data using industry benchmarks and standards",
      icon: "⚖️"
    },
    {
      step: 3,
      title: "Weighted Scoring",
      description: "Apply weights: Environmental (40%), Social (30%), Governance (30%)",
      icon: "🔢"
    },
    {
      step: 4,
      title: "Final Score",
      description: "Generate comprehensive ESG score from 0-100",
      icon: "🎯"
    }
  ];

  return (
    <>
      <AuthNavbar />
      
      <div className="home-page">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-container">
            <div className="hero-content">
              <h1 className="hero-title">
                Transform Your Business with
                <span className="gradient-text"> ESG Excellence</span>
              </h1>
              <p className="hero-subtitle">
                Measure, track, and improve your Environmental, Social, and Governance performance 
                with our comprehensive ESG management platform.
              </p>
              <div className="hero-actions">
                <button 
                  className="cta-primary"
                  onClick={() => window.location.href = '/esg'}
                >
                  Start ESG Assessment
                </button>
                <button 
                  className="cta-secondary"
                  onClick={() => window.location.href = '/dashboard'}
                >
                  View Dashboard
                </button>
              </div>
            </div>
            <div className="hero-visual">
              <div className="esg-circle">
                <div className="esg-pillar environmental">
                  <span className="pillar-icon">🌱</span>
                  <span className="pillar-label">Environmental</span>
                </div>
                <div className="esg-pillar social">
                  <span className="pillar-icon">👥</span>
                  <span className="pillar-label">Social</span>
                </div>
                <div className="esg-pillar governance">
                  <span className="pillar-icon">⚖️</span>
                  <span className="pillar-label">Governance</span>
                </div>
                <div className="center-score">
                  <span className="score-number">ESG</span>
                  <span className="score-label">Score</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Tabs */}
        <section className="content-navigation">
          <div className="nav-tabs">
            <button 
              className={`nav-tab ${activeSection === 'what-is-esg' ? 'active' : ''}`}
              onClick={() => setActiveSection('what-is-esg')}
            >
              What is ESG?
            </button>
            <button 
              className={`nav-tab ${activeSection === 'calculation' ? 'active' : ''}`}
              onClick={() => setActiveSection('calculation')}
            >
              How It's Calculated
            </button>
            <button 
              className={`nav-tab ${activeSection === 'benefits' ? 'active' : ''}`}
              onClick={() => setActiveSection('benefits')}
            >
              Benefits
            </button>
          </div>
        </section>

        {/* Content Sections */}
        <section className="content-sections">
          <div className="content-container">
            
            {/* What is ESG Section */}
            {activeSection === 'what-is-esg' && (
              <div className="content-section">
                <h2 className="section-title">Understanding ESG</h2>
                <p className="section-description">
                  ESG stands for Environmental, Social, and Governance - three key factors used to measure 
                  the sustainability and ethical impact of a business or investment.
                </p>
                
                <div className="pillars-grid">
                  {esgPillars.map((pillar) => (
                    <div key={pillar.id} className="pillar-card">
                      <div className="pillar-header">
                        <span className="pillar-icon-large">{pillar.icon}</span>
                        <h3 className="pillar-title" style={{ color: pillar.color }}>
                          {pillar.title}
                        </h3>
                      </div>
                      <p className="pillar-description">{pillar.description}</p>
                      <div className="pillar-metrics">
                        <h4>Key Metrics:</h4>
                        <ul>
                          {pillar.metrics.map((metric, index) => (
                            <li key={index}>{metric}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Calculation Section */}
            {activeSection === 'calculation' && (
              <div className="content-section">
                <h2 className="section-title">How ESG Scores Are Calculated</h2>
                <p className="section-description">
                  Our ESG scoring methodology follows industry standards and best practices, 
                  providing transparent and actionable insights.
                </p>
                
                <div className="calculation-flow">
                  {calculationSteps.map((step, index) => (
                    <div key={step.step} className="calculation-step">
                      <div className="step-number">{step.step}</div>
                      <div className="step-content">
                        <div className="step-icon">{step.icon}</div>
                        <h3 className="step-title">{step.title}</h3>
                        <p className="step-description">{step.description}</p>
                      </div>
                      {index < calculationSteps.length - 1 && (
                        <div className="step-arrow">→</div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="scoring-breakdown">
                  <h3>Scoring Weights</h3>
                  <div className="weight-bars">
                    <div className="weight-bar">
                      <span className="weight-label">Environmental</span>
                      <div className="weight-progress">
                        <div className="weight-fill environmental" style={{ width: '40%' }}></div>
                      </div>
                      <span className="weight-value">40%</span>
                    </div>
                    <div className="weight-bar">
                      <span className="weight-label">Social</span>
                      <div className="weight-progress">
                        <div className="weight-fill social" style={{ width: '30%' }}></div>
                      </div>
                      <span className="weight-value">30%</span>
                    </div>
                    <div className="weight-bar">
                      <span className="weight-label">Governance</span>
                      <div className="weight-progress">
                        <div className="weight-fill governance" style={{ width: '30%' }}></div>
                      </div>
                      <span className="weight-value">30%</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Benefits Section */}
            {activeSection === 'benefits' && (
              <div className="content-section">
                <h2 className="section-title">Benefits of High ESG Scores</h2>
                <p className="section-description">
                  Strong ESG performance delivers measurable business value across multiple dimensions.
                </p>
                
                <div className="benefits-grid">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="benefit-card">
                      <div className="benefit-icon">{benefit.icon}</div>
                      <h3 className="benefit-title">{benefit.title}</h3>
                      <p className="benefit-description">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                <div className="stats-section">
                  <h3>ESG by the Numbers</h3>
                  <div className="stats-grid">
                    <div className="stat-item">
                      <span className="stat-number">$30T</span>
                      <span className="stat-label">Assets under ESG management</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">88%</span>
                      <span className="stat-label">Of investors consider ESG factors</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">25%</span>
                      <span className="stat-label">Higher employee retention</span>
                    </div>
                    <div className="stat-item">
                      <span className="stat-number">15%</span>
                      <span className="stat-label">Average cost savings</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Call to Action */}
        <section className="cta-section">
          <div className="cta-container">
            <h2 className="cta-title">Ready to Start Your ESG Journey?</h2>
            <p className="cta-description">
              Begin measuring and improving your ESG performance today with our comprehensive platform.
            </p>
            <div className="cta-actions">
              <button 
                className="cta-primary"
                onClick={() => window.location.href = '/esg'}
              >
                Submit ESG Data
              </button>
              <button 
                className="cta-secondary"
                onClick={() => window.location.href = '/dashboard'}
              >
                Explore Dashboard
              </button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
    </>
  );
}

export default Home;