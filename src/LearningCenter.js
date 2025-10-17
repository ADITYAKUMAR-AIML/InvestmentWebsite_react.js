import React, { useState } from 'react';
import './LearningCenter.css';

const LearningCenter = () => {
  const [activeTab, setActiveTab] = useState('terms');
  const [expandedTerm, setExpandedTerm] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const financialTerms = [
    {
      id: 1,
      term: "Portfolio",
      definition: "A collection of financial investments like stocks, bonds, commodities, cash, and cash equivalents, including closed-end funds and exchange traded funds (ETFs).",
      example: "Your investment dashboard shows your personal portfolio of stocks."
    },
    {
      id: 2,
      term: "Stock",
      definition: "A type of security that signifies proportionate ownership in the issuing corporation.",
      example: "When you buy Apple (AAPL) stock, you own a small piece of the company."
    },
    {
      id: 3,
      term: "Dividend",
      definition: "A distribution of a portion of a company's earnings to its shareholders, decided by the board of directors.",
      example: "If you own 100 shares of a company that pays a $1 dividend, you'll receive $100."
    },
    {
      id: 4,
      term: "Bull Market",
      definition: "A financial market in which prices are rising or are expected to rise.",
      example: "When stock prices keep going up for several months, it's called a bull market."
    },
    {
      id: 5,
      term: "Bear Market",
      definition: "A market condition in which prices are falling or are expected to fall.",
      example: "When the market drops 20% or more from recent highs, it's considered a bear market."
    },
    {
      id: 6,
      term: "ETF",
      definition: "Exchange-Traded Fund - a type of investment fund that holds multiple assets and trades on stock exchanges.",
      example: "SPY is an ETF that tracks the S&P 500 index."
    },
    {
      id: 7,
      term: "Volatility",
      definition: "The degree of variation in trading prices over time, usually measured by standard deviation.",
      example: "High volatility means prices change rapidly in a short period."
    },
    {
      id: 8,
      term: "Diversification",
      definition: "The practice of spreading investments among different financial instruments to reduce risk.",
      example: "Instead of buying only tech stocks, you invest in healthcare, energy, and consumer goods too."
    }
  ];

  const dashboardTutorials = [
    {
      id: 1,
      title: "Understanding Your Portfolio",
      description: "Learn how to read and interpret your portfolio summary",
      steps: [
        "Portfolio Value shows your total investment worth",
        "Daily Change indicates how much your portfolio gained or lost today",
        "The percentage change helps compare performance regardless of portfolio size"
      ]
    },
    {
      id: 2,
      title: "Reading Stock Tables",
      description: "How to understand the information in your holdings table",
      steps: [
        "Stock Symbol: The company's ticker symbol (e.g., AAPL for Apple)",
        "Price: Current price per share",
        "Change: How much the price moved since yesterday",
        "Shares: Number of shares you own",
        "Value: Total value of your position (Price × Shares)"
      ]
    },
    {
      id: 3,
      title: "Using the Watchlist",
      description: "How to effectively use the watchlist feature",
      steps: [
        "Add stocks you're interested in but don't own yet",
        "Monitor price movements without buying",
        "Use it to research before making investment decisions"
      ]
    },
    {
      id: 4,
      title: "Interpreting Market News",
      description: "How to use news to inform your investment decisions",
      steps: [
        "Read news from reliable financial sources",
        "Understand how news affects stock prices",
        "Don't make impulsive decisions based on single news items"
      ]
    }
  ];

  const courses = [
    {
      id: 1,
      title: "Investing Fundamentals",
      level: "Beginner",
      duration: "2 hours",
      lessons: 8,
      description: "Learn the basics of stock market investing and build a solid foundation.",
      topics: [
        "What is the stock market?",
        "How to buy and sell stocks",
        "Understanding risk and return",
        "Building your first portfolio"
      ],
      completed: false
    },
    {
      id: 2,
      title: "Technical Analysis",
      level: "Intermediate",
      duration: "4 hours",
      lessons: 12,
      description: "Learn to read charts and identify trading opportunities.",
      topics: [
        "Chart patterns and trends",
        "Support and resistance levels",
        "Technical indicators",
        "Trading strategies"
      ],
      completed: false
    },
    {
      id: 3,
      title: "Portfolio Management",
      level: "Intermediate",
      duration: "3 hours",
      lessons: 10,
      description: "Learn how to build and manage a diversified investment portfolio.",
      topics: [
        "Asset allocation strategies",
        "Risk management techniques",
        "Rebalancing your portfolio",
        "Performance measurement"
      ],
      completed: false
    },
    {
      id: 4,
      title: "Advanced Trading Strategies",
      level: "Advanced",
      duration: "6 hours",
      lessons: 15,
      description: "Master complex trading strategies and risk management.",
      topics: [
        "Options trading basics",
        "Hedging strategies",
        "Algorithmic trading concepts",
        "Advanced risk management"
      ],
      completed: false
    }
  ];

  const toggleTerm = (termId) => {
    setExpandedTerm(expandedTerm === termId ? null : termId);
  };

  const startCourse = (course) => {
    setSelectedCourse(course);
    setActiveTab('courses');
  };

  const completeCourse = (courseId) => {
    // In a real app, this would update in the database
    alert(`Congratulations! You've completed the course.`);
    setSelectedCourse(null);
  };

  return (
    <div className="learning-center">
      {/* Header */}
      <header className="learning-header">
        <h1>Investment Learning Center</h1>
        <p>Master investing concepts and learn how to use our platform effectively</p>
      </header>

      {/* Navigation Tabs */}
      <nav className="learning-nav">
        <button 
          className={`nav-tab ${activeTab === 'terms' ? 'active' : ''}`}
          onClick={() => setActiveTab('terms')}
        >
          Financial Terms
        </button>
        <button 
          className={`nav-tab ${activeTab === 'tutorials' ? 'active' : ''}`}
          onClick={() => setActiveTab('tutorials')}
        >
          Dashboard Tutorials
        </button>
        <button 
          className={`nav-tab ${activeTab === 'courses' ? 'active' : ''}`}
          onClick={() => setActiveTab('courses')}
        >
          Courses
        </button>
      </nav>

      {/* Main Content */}
      <div className="learning-content">
        
        {/* Financial Terms Section */}
        {activeTab === 'terms' && (
          <section className="terms-section">
            <h2>Essential Financial Terms</h2>
            <p className="section-description">
              Understanding these terms will help you navigate the investment world with confidence.
            </p>
            
            <div className="terms-grid">
              {financialTerms.map(term => (
                <div 
                  key={term.id} 
                  className={`term-card ${expandedTerm === term.id ? 'expanded' : ''}`}
                  onClick={() => toggleTerm(term.id)}
                >
                  <div className="term-header">
                    <h3>{term.term}</h3>
                    <span className="expand-icon">
                      {expandedTerm === term.id ? '−' : '+'}
                    </span>
                  </div>
                  {expandedTerm === term.id && (
                    <div className="term-details">
                      <p className="definition">{term.definition}</p>
                      <div className="example">
                        <strong>Example:</strong> {term.example}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Dashboard Tutorials Section */}
        {activeTab === 'tutorials' && (
          <section className="tutorials-section">
            <h2>Dashboard Tutorials</h2>
            <p className="section-description">
              Learn how to make the most of your investment dashboard.
            </p>
            
            <div className="tutorials-grid">
              {dashboardTutorials.map(tutorial => (
                <div key={tutorial.id} className="tutorial-card">
                  <h3>{tutorial.title}</h3>
                  <p className="tutorial-description">{tutorial.description}</p>
                  <ul className="tutorial-steps">
                    {tutorial.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="quick-tips">
              <h3>Quick Tips</h3>
              <div className="tips-grid">
                <div className="tip">
                  <span className="tip-icon">💡</span>
                  <p>Check your portfolio regularly but avoid making emotional decisions based on short-term movements</p>
                </div>
                <div className="tip">
                  <span className="tip-icon">📊</span>
                  <p>Use the watchlist to research stocks before investing your money</p>
                </div>
                <div className="tip">
                  <span className="tip-icon">🔔</span>
                  <p>Set up price alerts for stocks you're interested in</p>
                </div>
                <div className="tip">
                  <span className="tip-icon">📈</span>
                  <p>Focus on long-term trends rather than daily fluctuations</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Courses Section */}
        {activeTab === 'courses' && (
          <section className="courses-section">
            <h2>Investment Courses</h2>
            <p className="section-description">
              Structured learning paths to take your investment knowledge to the next level.
            </p>

            {selectedCourse ? (
              <div className="course-detail">
                <button 
                  className="back-button"
                  onClick={() => setSelectedCourse(null)}
                >
                  ← Back to Courses
                </button>
                
                <div className="course-header">
                  <h3>{selectedCourse.title}</h3>
                  <div className="course-meta">
                    <span className={`level-badge ${selectedCourse.level.toLowerCase()}`}>
                      {selectedCourse.level}
                    </span>
                    <span className="duration">{selectedCourse.duration}</span>
                    <span className="lessons">{selectedCourse.lessons} lessons</span>
                  </div>
                </div>

                <p className="course-description">{selectedCourse.description}</p>

                <div className="course-content">
                  <h4>What You'll Learn:</h4>
                  <ul className="topics-list">
                    {selectedCourse.topics.map((topic, index) => (
                      <li key={index}>{topic}</li>
                    ))}
                  </ul>

                  <div className="course-progress">
                    <div className="progress-bar">
                      <div className="progress-fill" style={{width: '0%'}}></div>
                    </div>
                    <span className="progress-text">0% Complete</span>
                  </div>

                  <button 
                    className="start-course-btn"
                    onClick={() => completeCourse(selectedCourse.id)}
                  >
                    Mark as Completed
                  </button>
                </div>
              </div>
            ) : (
              <div className="courses-grid">
                {courses.map(course => (
                  <div key={course.id} className="course-card">
                    <div className="course-info">
                      <h3>{course.title}</h3>
                      <div className="course-meta">
                        <span className={`level-badge ${course.level.toLowerCase()}`}>
                          {course.level}
                        </span>
                        <span className="duration">{course.duration}</span>
                        <span className="lessons">{course.lessons} lessons</span>
                      </div>
                      <p className="course-description">{course.description}</p>
                      <div className="topics-preview">
                        {course.topics.slice(0, 2).map((topic, index) => (
                          <span key={index} className="topic-tag">{topic}</span>
                        ))}
                        {course.topics.length > 2 && (
                          <span className="topic-tag">+{course.topics.length - 2} more</span>
                        )}
                      </div>
                    </div>
                    <button 
                      className="enroll-btn"
                      onClick={() => startCourse(course)}
                    >
                      Start Course
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="learning-path">
              <h3>Recommended Learning Path</h3>
              <div className="path-steps">
                <div className="path-step active">
                  <span className="step-number">1</span>
                  <span className="step-text">Investing Fundamentals</span>
                </div>
                <div className="path-step">
                  <span className="step-number">2</span>
                  <span className="step-text">Portfolio Management</span>
                </div>
                <div className="path-step">
                  <span className="step-number">3</span>
                  <span className="step-text">Technical Analysis</span>
                </div>
                <div className="path-step">
                  <span className="step-number">4</span>
                  <span className="step-text">Advanced Strategies</span>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default LearningCenter;