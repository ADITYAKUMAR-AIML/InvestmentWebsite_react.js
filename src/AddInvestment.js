import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddInvestment.css';

const AddInvestment = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stocks');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [investmentData, setInvestmentData] = useState({
    shares: '',
    price: '',
    totalAmount: '',
    date: new Date().toISOString().split('T')[0],
    transactionType: 'buy'
  });

  // Mock stock data for search
  const availableStocks = [
    { symbol: 'AAPL', name: 'Apple Inc.', price: 182.63, change: 2.34, changePercent: 1.3 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 415.50, change: -1.25, changePercent: -0.3 },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 151.23, change: 1.45, changePercent: 0.97 },
    { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 178.22, change: 3.15, changePercent: 1.8 },
    { symbol: 'TSLA', name: 'Tesla Inc.', price: 245.18, change: 8.42, changePercent: 3.56 },
    { symbol: 'META', name: 'Meta Platforms Inc.', price: 485.75, change: -2.30, changePercent: -0.47 },
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 950.02, change: 15.25, changePercent: 1.63 },
    { symbol: 'JPM', name: 'JPMorgan Chase & Co.', price: 189.45, change: 0.89, changePercent: 0.47 },
    { symbol: 'JNJ', name: 'Johnson & Johnson', price: 157.80, change: -0.75, changePercent: -0.47 },
    { symbol: 'V', name: 'Visa Inc.', price: 279.33, change: 2.15, changePercent: 0.78 }
  ];

  // Mock ETFs
  const availableETFs = [
    { symbol: 'SPY', name: 'SPDR S&P 500 ETF', price: 512.34, change: 3.21, changePercent: 0.63 },
    { symbol: 'QQQ', name: 'Invesco QQQ Trust', price: 443.56, change: 2.89, changePercent: 0.66 },
    { symbol: 'VTI', name: 'Vanguard Total Stock Market ETF', price: 254.78, change: 1.45, changePercent: 0.57 },
    { symbol: 'VOO', name: 'Vanguard S&P 500 ETF', price: 467.89, change: 2.67, changePercent: 0.57 }
  ];

  // Mock cryptocurrencies
  const availableCrypto = [
    { symbol: 'BTC', name: 'Bitcoin', price: 61542.78, change: 1245.67, changePercent: 2.07 },
    { symbol: 'ETH', name: 'Ethereum', price: 3421.56, change: 45.23, changePercent: 1.34 },
    { symbol: 'ADA', name: 'Cardano', price: 0.63, change: 0.02, changePercent: 3.28 }
  ];

  useEffect(() => {
    if (searchQuery.length > 1) {
      const results = availableStocks.filter(stock =>
        stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stock.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    if (selectedStock && investmentData.shares) {
      const total = parseFloat(investmentData.shares) * selectedStock.price;
      setInvestmentData(prev => ({
        ...prev,
        totalAmount: total.toFixed(2),
        price: selectedStock.price.toFixed(2)
      }));
    }
  }, [selectedStock, investmentData.shares]);

  const handleStockSelect = (stock) => {
    setSelectedStock(stock);
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleInputChange = (field, value) => {
    setInvestmentData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'shares' && selectedStock) {
      const total = parseFloat(value) * selectedStock.price;
      setInvestmentData(prev => ({
        ...prev,
        totalAmount: total.toFixed(2)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!selectedStock) {
      alert('Please select a stock first');
      return;
    }

    const investment = {
      id: Date.now(),
      symbol: selectedStock.symbol,
      name: selectedStock.name,
      shares: parseFloat(investmentData.shares),
      price: parseFloat(investmentData.price),
      totalAmount: parseFloat(investmentData.totalAmount),
      date: investmentData.date,
      transactionType: investmentData.transactionType
    };

    // In a real app, this would save to a database or context
    console.log('New investment:', investment);
    
    // Save to localStorage for demo purposes
    const existingInvestments = JSON.parse(localStorage.getItem('portfolioInvestments') || '[]');
    const updatedInvestments = [...existingInvestments, investment];
    localStorage.setItem('portfolioInvestments', JSON.stringify(updatedInvestments));

    alert('Investment added successfully!');
    navigate('/dashboard');
  };

  const getCurrentAssets = () => {
    switch (activeTab) {
      case 'stocks': return availableStocks;
      case 'etfs': return availableETFs;
      case 'crypto': return availableCrypto;
      default: return [];
    }
  };

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
    <div className="add-investment">
      {/* Header */}
      <header className="investment-header">
        <button className="back-button" onClick={() => navigate('/dashboard')}>
          ← Back to Dashboard
        </button>
        <h1>Add New Investment</h1>
        <p>Search and add stocks, ETFs, or cryptocurrencies to your portfolio</p>
      </header>

      <div className="investment-container">
        {/* Left Side - Search and Selection */}
        <div className="selection-panel">
          <div className="asset-type-tabs">
            <button 
              className={`tab ${activeTab === 'stocks' ? 'active' : ''}`}
              onClick={() => setActiveTab('stocks')}
            >
              Stocks
            </button>
            <button 
              className={`tab ${activeTab === 'etfs' ? 'active' : ''}`}
              onClick={() => setActiveTab('etfs')}
            >
              ETFs
            </button>
            <button 
              className={`tab ${activeTab === 'crypto' ? 'active' : ''}`}
              onClick={() => setActiveTab('crypto')}
            >
              Crypto
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-section">
            <div className="search-bar">
              <input
                type="text"
                placeholder={`Search ${activeTab}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="search-results">
                {searchResults.map(stock => (
                  <div
                    key={stock.symbol}
                    className="search-result-item"
                    onClick={() => handleStockSelect(stock)}
                  >
                    <div className="stock-info">
                      <div className="stock-symbol">{stock.symbol}</div>
                      <div className="stock-name">{stock.name}</div>
                    </div>
                    <div className="stock-price">
                      {formatCurrency(stock.price)}
                      <div className={`price-change ${stock.change >= 0 ? 'positive' : 'negative'}`}>
                        {formatCurrency(stock.change)} ({formatPercent(stock.changePercent)})
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Popular Assets */}
            <div className="popular-assets">
              <h3>Popular {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h3>
              <div className="assets-grid">
                {getCurrentAssets().map(asset => (
                  <div
                    key={asset.symbol}
                    className={`asset-card ${selectedStock?.symbol === asset.symbol ? 'selected' : ''}`}
                    onClick={() => handleStockSelect(asset)}
                  >
                    <div className="asset-symbol">{asset.symbol}</div>
                    <div className="asset-name">{asset.name}</div>
                    <div className="asset-price">{formatCurrency(asset.price)}</div>
                    <div className={`asset-change ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                      {formatPercent(asset.changePercent)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Investment Form */}
        <div className="form-panel">
          {selectedStock ? (
            <form onSubmit={handleSubmit} className="investment-form">
              <div className="selected-stock-header">
                <h3>Add {selectedStock.name} ({selectedStock.symbol})</h3>
                <div className="current-price">
                  Current Price: {formatCurrency(selectedStock.price)}
                  <span className={`price-change ${selectedStock.change >= 0 ? 'positive' : 'negative'}`}>
                    {formatCurrency(selectedStock.change)} ({formatPercent(selectedStock.changePercent)})
                  </span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="transactionType">Transaction Type</label>
                <select
                  id="transactionType"
                  value={investmentData.transactionType}
                  onChange={(e) => handleInputChange('transactionType', e.target.value)}
                  className="form-select"
                >
                  <option value="buy">Buy</option>
                  <option value="sell">Sell</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="shares">
                  Number of Shares
                  {selectedStock.symbol === 'BTC' && ' (Units)'}
                </label>
                <input
                  type="number"
                  id="shares"
                  value={investmentData.shares}
                  onChange={(e) => handleInputChange('shares', e.target.value)}
                  placeholder="Enter number of shares"
                  min="0"
                  step="0.001"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="price">Price per Share</label>
                <input
                  type="number"
                  id="price"
                  value={investmentData.price}
                  onChange={(e) => handleInputChange('price', e.target.value)}
                  placeholder="Enter price per share"
                  min="0"
                  step="0.01"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="date">Transaction Date</label>
                <input
                  type="date"
                  id="date"
                  value={investmentData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className="form-input"
                  required
                />
              </div>

              <div className="calculation-summary">
                <div className="summary-item">
                  <span>Total Investment:</span>
                  <span className="total-amount">
                    {formatCurrency(investmentData.totalAmount || 0)}
                  </span>
                </div>
                {investmentData.shares && (
                  <div className="breakdown">
                    <small>
                      {investmentData.shares} shares × {formatCurrency(selectedStock.price)} = {formatCurrency(investmentData.totalAmount || 0)}
                    </small>
                  </div>
                )}
              </div>

              <button type="submit" className="submit-btn">
                {investmentData.transactionType === 'buy' ? 'Buy' : 'Sell'} {selectedStock.symbol}
              </button>

              <button
                type="button"
                className="change-stock-btn"
                onClick={() => setSelectedStock(null)}
              >
                Choose Different Stock
              </button>
            </form>
          ) : (
            <div className="placeholder-form">
              <div className="placeholder-icon">📈</div>
              <h3>Select an Investment</h3>
              <p>Choose a stock, ETF, or cryptocurrency from the left panel to start adding to your portfolio.</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="quick-tips">
        <h3>Investment Tips</h3>
        <div className="tips-grid">
          <div className="tip">
            <span className="tip-icon">💡</span>
            <p>Start with companies you understand and believe in long-term</p>
          </div>
          <div className="tip">
            <span className="tip-icon">📊</span>
            <p>Diversify your portfolio across different sectors</p>
          </div>
          <div className="tip">
            <span className="tip-icon">⏰</span>
            <p>Consider dollar-cost averaging instead of timing the market</p>
          </div>
          <div className="tip">
            <span className="tip-icon">🎯</span>
            <p>Set clear investment goals and time horizons</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInvestment;