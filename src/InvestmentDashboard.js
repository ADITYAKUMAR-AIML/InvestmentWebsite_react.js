import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const InvestmentDashboard = () => {
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 12500.75,
    dailyChange: 245.50,
    dailyChangePercent: 2.0,
    stocks: [
      { id: 1, name: 'Apple Inc.', symbol: 'AAPL', price: 182.63, change: 2.34, changePercent: 1.3, shares: 10 },
      { id: 2, name: 'Microsoft', symbol: 'MSFT', price: 415.50, change: -1.25, changePercent: -0.3, shares: 5 },
      { id: 3, name: 'Tesla', symbol: 'TSLA', price: 245.18, change: 8.42, changePercent: 3.56, shares: 8 },
      { id: 4, name: 'Amazon', symbol: 'AMZN', price: 178.22, change: 3.15, changePercent: 1.8, shares: 12 }
    ]
  });

  const [marketNews, setMarketNews] = useState([
    { id: 1, title: 'Tech Stocks Rally on Strong Earnings', source: 'Financial Times', time: '2 hours ago' },
    { id: 2, title: 'Fed Holds Interest Rates Steady', source: 'Bloomberg', time: '5 hours ago' },
    { id: 3, title: 'Market Volatility Expected This Week', source: 'CNBC', time: '1 day ago' }
  ]);

  const [watchlist, setWatchlist] = useState([
    { id: 1, symbol: 'GOOGL', name: 'Alphabet Inc.', price: 151.23, change: 1.45 },
    { id: 2, symbol: 'META', name: 'Meta Platforms', price: 485.75, change: -2.30 },
    { id: 3, symbol: 'NVDA', name: 'NVIDIA Corp.', price: 950.02, change: 15.25 }
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPortfolioData(prev => ({
        ...prev,
        stocks: prev.stocks.map(stock => ({
          ...stock,
          price: stock.price + (Math.random() - 0.5) * 2,
          change: stock.change + (Math.random() - 0.5) * 0.5
        }))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercent = (percent) => {
    return `${percent >= 0 ? '+' : ''}${percent.toFixed(2)}%`;
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <h1>Investment Dashboard</h1>
        <div className="header-actions">
          <button className="btn-primary">Add Investment</button>
          <button className="btn-secondary">Export Report</button>
        </div>
      </header>

      {/* Portfolio Summary */}
      <section className="portfolio-summary">
        <div className="summary-card">
          <h3>Portfolio Value</h3>
          <div className="value">{formatCurrency(portfolioData.totalValue)}</div>
          <div className={`change ${portfolioData.dailyChange >= 0 ? 'positive' : 'negative'}`}>
            {formatCurrency(portfolioData.dailyChange)} ({formatPercent(portfolioData.dailyChangePercent)})
          </div>
        </div>
        
        <div className="summary-stats">
          <div className="stat">
            <span className="stat-label">Today's Gain</span>
            <span className="stat-value positive">{formatCurrency(portfolioData.dailyChange)}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total Investments</span>
            <span className="stat-value">{portfolioData.stocks.length}</span>
          </div>
          <div className="stat">
            <span className="stat-label">Best Performer</span>
            <span className="stat-value positive">TSLA +3.56%</span>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Holdings Table */}
        <section className="holdings-section">
          <h2>Your Holdings</h2>
          <div className="table-container">
            <table className="holdings-table">
              <thead>
                <tr>
                  <th>Stock</th>
                  <th>Price</th>
                  <th>Change</th>
                  <th>Shares</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {portfolioData.stocks.map(stock => (
                  <tr key={stock.id}>
                    <td>
                      <Link to={`/stock/${stock.symbol}`} className="stock-link">
                        <div className="stock-info">
                          <div className="stock-name">{stock.name}</div>
                          <div className="stock-symbol">{stock.symbol}</div>
                        </div>
                      </Link>
                    </td>
                    <td>{formatCurrency(stock.price)}</td>
                    <td className={stock.change >= 0 ? 'positive' : 'negative'}>
                      {formatCurrency(stock.change)} ({formatPercent(stock.changePercent)})
                    </td>
                    <td>{stock.shares}</td>
                    <td>{formatCurrency(stock.price * stock.shares)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Sidebar */}
        <div className="sidebar">
          {/* Watchlist */}
          <section className="watchlist-section">
            <h3>Watchlist</h3>
            <div className="watchlist">
              {watchlist.map(item => (
                <div key={item.id} className="watchlist-item">
                  <div className="watchlist-info">
                    <div className="watchlist-symbol">{item.symbol}</div>
                    <div className="watchlist-name">{item.name}</div>
                  </div>
                  <div className="watchlist-price">
                    <div>{formatCurrency(item.price)}</div>
                    <div className={item.change >= 0 ? 'positive' : 'negative'}>
                      {formatCurrency(item.change)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Market News */}
          <section className="news-section">
            <h3>Market News</h3>
            <div className="news-list">
              {marketNews.map(news => (
                <div key={news.id} className="news-item">
                  <h4>{news.title}</h4>
                  <div className="news-meta">
                    <span>{news.source}</span>
                    <span>{news.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDashboard;