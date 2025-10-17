import React, { useState, useEffect } from 'react';
import './StockDetail.css';

const StockDetail = ({ match }) => {
  const [stock, setStock] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [timeRange, setTimeRange] = useState('1D');
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Mock data for the stock
  const mockStockData = {
    id: 1,
    symbol: 'AAPL',
    name: 'Apple Inc.',
    currentPrice: 182.63,
    change: 2.34,
    changePercent: 1.3,
    open: 180.50,
    high: 183.25,
    low: 179.80,
    volume: 28563920,
    marketCap: 2860000000000,
    peRatio: 29.5,
    dividendYield: 0.55,
    fiftyTwoWeekHigh: 199.62,
    fiftyTwoWeekLow: 124.17,
    about: `Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. The company offers iPhone, Mac, iPad, AirPods, Apple TV, Apple Watch, Beats products, and HomePod. It also provides AppleCare support services; and digital content stores and streaming services.`,
    sector: 'Technology',
    industry: 'Consumer Electronics',
    employees: 164000,
    headquarters: 'Cupertino, California',
    founded: 1976
  };

  const priceHistory = {
    '1D': [181.2, 181.5, 181.8, 182.1, 182.3, 182.6, 182.4, 182.7, 182.9, 183.1, 182.8, 182.6, 182.4, 182.2, 182.5, 182.7, 182.9, 183.0, 182.8, 182.6, 182.4, 182.3, 182.5, 182.6, 182.6],
    '1W': [178.5, 179.2, 180.1, 181.3, 182.0, 181.8, 182.6],
    '1M': [175.0, 176.2, 177.8, 179.1, 180.5, 181.2, 180.8, 181.5, 182.1, 181.9, 182.4, 183.0, 182.7, 182.3, 182.8, 183.2, 182.9, 182.6, 182.3, 182.7, 182.9],
    '1Y': [145.0, 148.2, 152.5, 156.8, 162.3, 165.7, 168.9, 172.4, 175.6, 178.2, 180.5, 182.6]
  };

  const news = [
    {
      id: 1,
      title: 'Apple Announces New iPhone 15 with Revolutionary Features',
      source: 'TechCrunch',
      time: '3 hours ago',
      sentiment: 'positive'
    },
    {
      id: 2,
      title: 'Apple Reports Strong Quarterly Earnings, Beats Estimates',
      source: 'Bloomberg',
      time: '1 day ago',
      sentiment: 'positive'
    },
    {
      id: 3,
      title: 'Analysts Raise Price Target for Apple Stock',
      source: 'CNBC',
      time: '2 days ago',
      sentiment: 'positive'
    },
    {
      id: 4,
      title: 'Apple Faces Regulatory Challenges in European Market',
      source: 'Financial Times',
      time: '3 days ago',
      sentiment: 'negative'
    }
  ];

  const keyMetrics = [
    { label: 'Market Cap', value: '$2.86T' },
    { label: 'P/E Ratio', value: '29.5' },
    { label: 'EPS', value: '$6.13' },
    { label: 'Dividend Yield', value: '0.55%' },
    { label: 'Beta', value: '1.2' },
    { label: '52W High', value: '$199.62' },
    { label: '52W Low', value: '$124.17' },
    { label: 'Volume', value: '28.56M' }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStock(mockStockData);
    }, 500);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatNumber = (num) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    return num.toLocaleString();
  };

  const toggleWatchlist = () => {
    setIsInWatchlist(!isInWatchlist);
    // In real app, this would call an API
  };

  const buyStock = () => {
    alert(`Buy ${stock.symbol} interface would open here`);
  };

  if (!stock) {
    return (
      <div className="stock-detail loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  return (
    <div className="stock-detail">
      {/* Header Section */}
      <header className="stock-header">
        <div className="stock-basic-info">
          <div className="stock-title">
            <h1>{stock.name}</h1>
            <span className="stock-symbol">{stock.symbol}</span>
          </div>
          <div className="stock-price">
            <div className="current-price">{formatCurrency(stock.currentPrice)}</div>
            <div className={`price-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
              {formatCurrency(stock.change)} ({stock.changePercent}%)
            </div>
          </div>
        </div>
        
        <div className="stock-actions">
          <button 
            className={`watchlist-btn ${isInWatchlist ? 'in-watchlist' : ''}`}
            onClick={toggleWatchlist}
          >
            {isInWatchlist ? '✓ In Watchlist' : '+ Watchlist'}
          </button>
          <button className="buy-btn" onClick={buyStock}>
            Buy Stock
          </button>
        </div>
      </header>

      {/* Price Chart Section */}
      <section className="chart-section">
        <div className="chart-header">
          <h2>Price Chart</h2>
          <div className="time-filters">
            {['1D', '1W', '1M', '3M', '1Y', '5Y'].map(range => (
              <button
                key={range}
                className={`time-filter ${timeRange === range ? 'active' : ''}`}
                onClick={() => setTimeRange(range)}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
        
        <div className="chart-container">
          {/* Simplified chart visualization */}
          <div className="mock-chart">
            <div className="chart-lines">
              {priceHistory[timeRange]?.map((price, index) => (
                <div
                  key={index}
                  className="chart-point"
                  style={{
                    left: `${(index / (priceHistory[timeRange].length - 1)) * 100}%`,
                    bottom: `${((price - Math.min(...priceHistory[timeRange])) / 
                             (Math.max(...priceHistory[timeRange]) - Math.min(...priceHistory[timeRange]))) * 80 + 10}%`
                  }}
                />
              ))}
            </div>
            <div className="chart-info">
              <div className="chart-stats">
                <span>Open: {formatCurrency(stock.open)}</span>
                <span>High: {formatCurrency(stock.high)}</span>
                <span>Low: {formatCurrency(stock.low)}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <nav className="stock-nav">
        <button 
          className={`nav-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={`nav-tab ${activeTab === 'financials' ? 'active' : ''}`}
          onClick={() => setActiveTab('financials')}
        >
          Financials
        </button>
        <button 
          className={`nav-tab ${activeTab === 'news' ? 'active' : ''}`}
          onClick={() => setActiveTab('news')}
        >
          News & Analysis
        </button>
        <button 
          className={`nav-tab ${activeTab === 'about' ? 'active' : ''}`}
          onClick={() => setActiveTab('about')}
        >
          About
        </button>
      </nav>

      {/* Tab Content */}
      <div className="tab-content">
        
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="metrics-grid">
              {keyMetrics.map((metric, index) => (
                <div key={index} className="metric-card">
                  <div className="metric-label">{metric.label}</div>
                  <div className="metric-value">{metric.value}</div>
                </div>
              ))}
            </div>

            <div className="performance-section">
              <h3>Performance</h3>
              <div className="performance-stats">
                <div className="performance-item">
                  <span className="label">Today</span>
                  <span className={`value ${stock.changePercent >= 0 ? 'positive' : 'negative'}`}>
                    {stock.changePercent}%
                  </span>
                </div>
                <div className="performance-item">
                  <span className="label">Week</span>
                  <span className="value positive">+2.3%</span>
                </div>
                <div className="performance-item">
                  <span className="label">Month</span>
                  <span className="value positive">+5.7%</span>
                </div>
                <div className="performance-item">
                  <span className="label">Year</span>
                  <span className="value positive">+25.8%</span>
                </div>
              </div>
            </div>

            <div className="analyst-section">
              <h3>Analyst Ratings</h3>
              <div className="analyst-ratings">
                <div className="rating-item">
                  <span className="rating-label">Strong Buy</span>
                  <div className="rating-bar">
                    <div className="rating-fill" style={{width: '45%'}}></div>
                  </div>
                  <span className="rating-count">23</span>
                </div>
                <div className="rating-item">
                  <span className="rating-label">Buy</span>
                  <div className="rating-bar">
                    <div className="rating-fill" style={{width: '30%'}}></div>
                  </div>
                  <span className="rating-count">15</span>
                </div>
                <div className="rating-item">
                  <span className="rating-label">Hold</span>
                  <div className="rating-bar">
                    <div className="rating-fill" style={{width: '15%'}}></div>
                  </div>
                  <span className="rating-count">8</span>
                </div>
                <div className="rating-item">
                  <span className="rating-label">Sell</span>
                  <div className="rating-bar">
                    <div className="rating-fill" style={{width: '7%'}}></div>
                  </div>
                  <span className="rating-count">4</span>
                </div>
                <div className="rating-item">
                  <span className="rating-label">Strong Sell</span>
                  <div className="rating-bar">
                    <div className="rating-fill" style={{width: '3%'}}></div>
                  </div>
                  <span className="rating-count">2</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Financials Tab */}
        {activeTab === 'financials' && (
          <div className="financials-tab">
            <div className="financials-section">
              <h3>Income Statement</h3>
              <div className="financial-table">
                <div className="table-row header">
                  <div className="table-cell">Metric</div>
                  <div className="table-cell">Current</div>
                  <div className="table-cell">Previous</div>
                  <div className="table-cell">Change</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Revenue</div>
                  <div className="table-cell">$383.3B</div>
                  <div className="table-cell">$365.8B</div>
                  <div className="table-cell positive">+4.8%</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Net Income</div>
                  <div className="table-cell">$97.0B</div>
                  <div className="table-cell">$99.8B</div>
                  <div className="table-cell negative">-2.8%</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">EPS</div>
                  <div className="table-cell">$6.13</div>
                  <div className="table-cell">$6.11</div>
                  <div className="table-cell positive">+0.3%</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Gross Margin</div>
                  <div className="table-cell">43.3%</div>
                  <div className="table-cell">43.8%</div>
                  <div className="table-cell negative">-0.5%</div>
                </div>
              </div>
            </div>

            <div className="financials-section">
              <h3>Balance Sheet</h3>
              <div className="financial-table">
                <div className="table-row header">
                  <div className="table-cell">Metric</div>
                  <div className="table-cell">Current</div>
                  <div className="table-cell">Previous</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Total Assets</div>
                  <div className="table-cell">$352.8B</div>
                  <div className="table-cell">$351.0B</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Total Liabilities</div>
                  <div className="table-cell">$279.4B</div>
                  <div className="table-cell">$287.9B</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Shareholder Equity</div>
                  <div className="table-cell">$73.4B</div>
                  <div className="table-cell">$63.1B</div>
                </div>
                <div className="table-row">
                  <div className="table-cell">Cash & Equivalents</div>
                  <div className="table-cell">$62.5B</div>
                  <div className="table-cell">$61.6B</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* News Tab */}
        {activeTab === 'news' && (
          <div className="news-tab">
            <h3>Latest News</h3>
            <div className="news-list">
              {news.map(item => (
                <div key={item.id} className="news-item">
                  <div className="news-content">
                    <h4>{item.title}</h4>
                    <div className="news-meta">
                      <span className="news-source">{item.source}</span>
                      <span className="news-time">{item.time}</span>
                      <span className={`sentiment ${item.sentiment}`}>
                        {item.sentiment === 'positive' ? '📈' : '📉'} 
                        {item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}
                      </span>
                    </div>
                  </div>
                  <button className="read-more">Read</button>
                </div>
              ))}
            </div>

            <div className="analysis-section">
              <h3>Market Analysis</h3>
              <div className="analysis-cards">
                <div className="analysis-card">
                  <h4>Technical Analysis</h4>
                  <p>RSI: 58 (Neutral)</p>
                  <p>MACD: Bullish</p>
                  <p>Support: $180.00</p>
                  <p>Resistance: $185.00</p>
                </div>
                <div className="analysis-card">
                  <h4>Fundamental Analysis</h4>
                  <p>P/E Ratio: Fairly Valued</p>
                  <p>Revenue Growth: Steady</p>
                  <p>Dividend: Reliable</p>
                  <p>Outlook: Positive</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* About Tab */}
        {activeTab === 'about' && (
          <div className="about-tab">
            <div className="company-info">
              <h3>About {stock.name}</h3>
              <p>{stock.about}</p>
              
              <div className="company-details">
                <div className="detail-item">
                  <strong>Sector:</strong> {stock.sector}
                </div>
                <div className="detail-item">
                  <strong>Industry:</strong> {stock.industry}
                </div>
                <div className="detail-item">
                  <strong>Employees:</strong> {formatNumber(stock.employees)}
                </div>
                <div className="detail-item">
                  <strong>Headquarters:</strong> {stock.headquarters}
                </div>
                <div className="detail-item">
                  <strong>Founded:</strong> {stock.founded}
                </div>
              </div>
            </div>

            <div className="key-executives">
              <h4>Key Executives</h4>
              <div className="executives-list">
                <div className="executive">
                  <span className="name">Tim Cook</span>
                  <span className="title">CEO</span>
                </div>
                <div className="executive">
                  <span className="name">Luca Maestri</span>
                  <span className="title">CFO</span>
                </div>
                <div className="executive">
                  <span className="name">Katherine Adams</span>
                  <span className="title">General Counsel</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StockDetail;