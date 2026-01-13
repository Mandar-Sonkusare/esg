import { useState } from "react";
import AuthNavbar from "../components/AuthNavbar";
import Footer from "../components/Footer";
import "./Resources.css";

function Resources() {
  const [activeSection, setActiveSection] = useState("fundamentals");

  const esgPillars = [
    {
      id: "environmental",
      title: "Environmental",
      icon: "🌱",
      color: "#4CAF50",
      description: "Environmental factors focus on how a company impacts the natural world and manages environmental risks.",
      keyAreas: [
        "Climate Change & Carbon Emissions",
        "Energy Efficiency & Renewable Energy",
        "Water Management & Conservation",
        "Waste Management & Circular Economy",
        "Biodiversity & Ecosystem Protection",
        "Pollution Prevention & Control"
      ],
      metrics: [
        "Scope 1, 2, 3 Carbon Emissions",
        "Energy Consumption & Renewable %",
        "Water Usage & Recycling",
        "Waste Generation & Diversion",
        "Environmental Compliance"
      ]
    },
    {
      id: "social",
      title: "Social",
      icon: "👥",
      color: "#2196F3",
      description: "Social factors examine how a company manages relationships with employees, suppliers, customers, and communities.",
      keyAreas: [
        "Employee Health, Safety & Wellbeing",
        "Diversity, Equity & Inclusion",
        "Labor Relations & Human Rights",
        "Community Engagement & Development",
        "Product Safety & Quality",
        "Data Privacy & Security"
      ],
      metrics: [
        "Employee Turnover & Satisfaction",
        "Diversity Metrics & Pay Equity",
        "Training Hours & Development",
        "Safety Incidents & Injury Rates",
        "Community Investment"
      ]
    },
    {
      id: "governance",
      title: "Governance",
      icon: "⚖️",
      color: "#FF9800",
      description: "Governance factors assess how a company is led, managed, and controlled by its leadership and board.",
      keyAreas: [
        "Board Composition & Independence",
        "Executive Compensation & Accountability",
        "Business Ethics & Anti-Corruption",
        "Risk Management & Oversight",
        "Shareholder Rights & Engagement",
        "Transparency & Disclosure"
      ],
      metrics: [
        "Board Independence & Diversity",
        "Executive Pay Ratios",
        "Ethics Training & Violations",
        "Audit Quality & Independence",
        "Shareholder Voting Rights"
      ]
    }
  ];

  const industryBenchmarks = [
    {
      sector: "Technology",
      avgScore: 72,
      topPerformers: ["Microsoft", "Apple", "Google"],
      keyFocus: ["Data Privacy", "Energy Efficiency", "Diversity"]
    },
    {
      sector: "Financial Services",
      avgScore: 68,
      topPerformers: ["JPMorgan", "Bank of America", "Wells Fargo"],
      keyFocus: ["Risk Management", "Financial Inclusion", "Governance"]
    },
    {
      sector: "Healthcare",
      avgScore: 75,
      topPerformers: ["Johnson & Johnson", "Pfizer", "Merck"],
      keyFocus: ["Product Safety", "Access to Medicine", "R&D Ethics"]
    },
    {
      sector: "Energy",
      avgScore: 58,
      topPerformers: ["NextEra Energy", "Enel", "Ørsted"],
      keyFocus: ["Renewable Transition", "Emissions Reduction", "Safety"]
    },
    {
      sector: "Manufacturing",
      avgScore: 64,
      topPerformers: ["3M", "General Electric", "Siemens"],
      keyFocus: ["Supply Chain", "Waste Reduction", "Worker Safety"]
    }
  ];

  const bestPractices = [
    {
      category: "Environmental",
      icon: "🌱",
      practices: [
        {
          title: "Set Science-Based Targets",
          description: "Align emissions reduction goals with climate science to limit global warming to 1.5°C",
          impact: "High",
          difficulty: "Medium"
        },
        {
          title: "Implement Circular Economy Principles",
          description: "Design out waste, keep products in use, and regenerate natural systems",
          impact: "High",
          difficulty: "High"
        },
        {
          title: "Renewable Energy Transition",
          description: "Switch to 100% renewable energy sources for operations",
          impact: "High",
          difficulty: "Medium"
        }
      ]
    },
    {
      category: "Social",
      icon: "👥",
      practices: [
        {
          title: "Diversity & Inclusion Programs",
          description: "Implement comprehensive D&I initiatives with measurable targets",
          impact: "High",
          difficulty: "Medium"
        },
        {
          title: "Employee Wellbeing Initiatives",
          description: "Provide mental health support, flexible work, and career development",
          impact: "Medium",
          difficulty: "Low"
        },
        {
          title: "Supply Chain Due Diligence",
          description: "Ensure suppliers meet labor and human rights standards",
          impact: "High",
          difficulty: "High"
        }
      ]
    },
    {
      category: "Governance",
      icon: "⚖️",
      practices: [
        {
          title: "Board Diversity & Independence",
          description: "Ensure diverse, independent board composition with relevant expertise",
          impact: "High",
          difficulty: "Medium"
        },
        {
          title: "ESG Integration in Strategy",
          description: "Embed ESG considerations into business strategy and decision-making",
          impact: "High",
          difficulty: "Medium"
        },
        {
          title: "Transparent Reporting",
          description: "Publish comprehensive sustainability reports with third-party verification",
          impact: "Medium",
          difficulty: "Low"
        }
      ]
    }
  ];

  const regulatoryUpdates = [
    {
      region: "European Union",
      regulation: "EU Taxonomy Regulation",
      status: "Active",
      deadline: "2024",
      description: "Classification system for environmentally sustainable economic activities",
      impact: "High"
    },
    {
      region: "United States",
      regulation: "SEC Climate Disclosure Rules",
      status: "Proposed",
      deadline: "2025",
      description: "Mandatory climate-related financial disclosures for public companies",
      impact: "High"
    },
    {
      region: "United Kingdom",
      regulation: "TCFD Mandatory Reporting",
      status: "Active",
      deadline: "2023",
      description: "Task Force on Climate-related Financial Disclosures requirements",
      impact: "Medium"
    },
    {
      region: "Global",
      regulation: "ISSB Standards",
      status: "Active",
      deadline: "2024",
      description: "International Sustainability Standards Board disclosure requirements",
      impact: "High"
    }
  ];

  const glossaryTerms = [
    {
      term: "Carbon Footprint",
      definition: "The total amount of greenhouse gases produced directly and indirectly by human activities, measured in CO2 equivalent."
    },
    {
      term: "Scope 1, 2, 3 Emissions",
      definition: "Scope 1: Direct emissions from owned sources. Scope 2: Indirect emissions from purchased energy. Scope 3: All other indirect emissions in the value chain."
    },
    {
      term: "Materiality",
      definition: "ESG topics that have a significant impact on a company's ability to create value and are important to stakeholders."
    },
    {
      term: "Science-Based Targets",
      definition: "Emissions reduction targets that are aligned with the level of decarbonization required to keep global temperature increase below 1.5°C."
    },
    {
      term: "Double Materiality",
      definition: "Considers both how sustainability issues affect the company (financial materiality) and how the company affects society and environment (impact materiality)."
    },
    {
      term: "Greenwashing",
      definition: "The practice of making misleading claims about environmental benefits to appear more environmentally responsible than actually is."
    }
  ];

  return (
    <>
      <AuthNavbar />
      
      <div className="resources-page">
        <div className="resources-container">
          <div className="resources-header">
            <h1 className="resources-title">ESG Learning Center</h1>
            <p className="resources-subtitle">
              Comprehensive resources to understand, implement, and excel in ESG practices
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="resources-nav">
            <button 
              className={`nav-tab ${activeSection === 'fundamentals' ? 'active' : ''}`}
              onClick={() => setActiveSection('fundamentals')}
            >
              📚 ESG Fundamentals
            </button>
            <button 
              className={`nav-tab ${activeSection === 'benchmarks' ? 'active' : ''}`}
              onClick={() => setActiveSection('benchmarks')}
            >
              📊 Industry Benchmarks
            </button>
            <button 
              className={`nav-tab ${activeSection === 'practices' ? 'active' : ''}`}
              onClick={() => setActiveSection('practices')}
            >
              ⭐ Best Practices
            </button>
            <button 
              className={`nav-tab ${activeSection === 'regulatory' ? 'active' : ''}`}
              onClick={() => setActiveSection('regulatory')}
            >
              📋 Regulatory Updates
            </button>
            <button 
              className={`nav-tab ${activeSection === 'glossary' ? 'active' : ''}`}
              onClick={() => setActiveSection('glossary')}
            >
              📖 Glossary
            </button>
          </div>

          {/* Content Sections */}
          <div className="resources-content">
            
            {/* ESG Fundamentals */}
            {activeSection === 'fundamentals' && (
              <div className="content-section">
                <h2 className="section-title">ESG Fundamentals</h2>
                <p className="section-description">
                  Understanding the three pillars of Environmental, Social, and Governance factors
                </p>
                
                <div className="pillars-grid">
                  {esgPillars.map((pillar) => (
                    <div key={pillar.id} className="pillar-card">
                      <div className="pillar-header">
                        <span className="pillar-icon" style={{ color: pillar.color }}>
                          {pillar.icon}
                        </span>
                        <h3 className="pillar-title" style={{ color: pillar.color }}>
                          {pillar.title}
                        </h3>
                      </div>
                      
                      <p className="pillar-description">{pillar.description}</p>
                      
                      <div className="pillar-section">
                        <h4>Key Focus Areas:</h4>
                        <ul className="pillar-list">
                          {pillar.keyAreas.map((area, index) => (
                            <li key={index}>{area}</li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="pillar-section">
                        <h4>Common Metrics:</h4>
                        <ul className="pillar-list">
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

            {/* Industry Benchmarks */}
            {activeSection === 'benchmarks' && (
              <div className="content-section">
                <h2 className="section-title">Industry Benchmarks</h2>
                <p className="section-description">
                  Compare ESG performance across different sectors and learn from industry leaders
                </p>
                
                <div className="benchmarks-grid">
                  {industryBenchmarks.map((benchmark, index) => (
                    <div key={index} className="benchmark-card">
                      <div className="benchmark-header">
                        <h3 className="benchmark-sector">{benchmark.sector}</h3>
                        <div className="benchmark-score">
                          <span className="score-number">{benchmark.avgScore}</span>
                          <span className="score-label">Avg Score</span>
                        </div>
                      </div>
                      
                      <div className="benchmark-content">
                        <div className="benchmark-section">
                          <h4>Top Performers:</h4>
                          <ul className="performer-list">
                            {benchmark.topPerformers.map((performer, idx) => (
                              <li key={idx}>{performer}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="benchmark-section">
                          <h4>Key Focus Areas:</h4>
                          <div className="focus-tags">
                            {benchmark.keyFocus.map((focus, idx) => (
                              <span key={idx} className="focus-tag">{focus}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Best Practices */}
            {activeSection === 'practices' && (
              <div className="content-section">
                <h2 className="section-title">Best Practices</h2>
                <p className="section-description">
                  Actionable strategies to improve your ESG performance and create sustainable value
                </p>
                
                <div className="practices-container">
                  {bestPractices.map((category, index) => (
                    <div key={index} className="practice-category">
                      <div className="category-header">
                        <span className="category-icon">{category.icon}</span>
                        <h3 className="category-title">{category.category}</h3>
                      </div>
                      
                      <div className="practices-list">
                        {category.practices.map((practice, idx) => (
                          <div key={idx} className="practice-item">
                            <div className="practice-header">
                              <h4 className="practice-title">{practice.title}</h4>
                              <div className="practice-badges">
                                <span className={`impact-badge impact-${practice.impact.toLowerCase()}`}>
                                  {practice.impact} Impact
                                </span>
                                <span className={`difficulty-badge difficulty-${practice.difficulty.toLowerCase()}`}>
                                  {practice.difficulty} Difficulty
                                </span>
                              </div>
                            </div>
                            <p className="practice-description">{practice.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Regulatory Updates */}
            {activeSection === 'regulatory' && (
              <div className="content-section">
                <h2 className="section-title">Regulatory Updates</h2>
                <p className="section-description">
                  Stay informed about the latest ESG regulations and compliance requirements
                </p>
                
                <div className="regulatory-list">
                  {regulatoryUpdates.map((update, index) => (
                    <div key={index} className="regulatory-item">
                      <div className="regulatory-header">
                        <div className="regulatory-info">
                          <h3 className="regulatory-title">{update.regulation}</h3>
                          <span className="regulatory-region">{update.region}</span>
                        </div>
                        <div className="regulatory-badges">
                          <span className={`status-badge status-${update.status.toLowerCase()}`}>
                            {update.status}
                          </span>
                          <span className={`impact-badge impact-${update.impact.toLowerCase()}`}>
                            {update.impact} Impact
                          </span>
                        </div>
                      </div>
                      
                      <p className="regulatory-description">{update.description}</p>
                      
                      <div className="regulatory-footer">
                        <span className="regulatory-deadline">
                          📅 Deadline: {update.deadline}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Glossary */}
            {activeSection === 'glossary' && (
              <div className="content-section">
                <h2 className="section-title">ESG Glossary</h2>
                <p className="section-description">
                  Essential ESG terminology and definitions to help you navigate the sustainability landscape
                </p>
                
                <div className="glossary-list">
                  {glossaryTerms.map((item, index) => (
                    <div key={index} className="glossary-item">
                      <h3 className="glossary-term">{item.term}</h3>
                      <p className="glossary-definition">{item.definition}</p>
                    </div>
                  ))}
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

export default Resources;