import React, { useState, useEffect } from 'react';
import '../styles/Dashboard.css';

function Dashboard({ bills }) {
  const [stats, setStats] = useState({
    totalBills: 0,
    totalRevenue: 0,
    todayRevenue: 0,
    totalItems: 0,
    averageBillValue: 0,
    topItems: []
  });

  useEffect(() => {
    calculateStats();
  }, [bills]);

  const calculateStats = () => {
    if (bills.length === 0) {
      setStats({
        totalBills: 0,
        totalRevenue: 0,
        todayRevenue: 0,
        totalItems: 0,
        averageBillValue: 0,
        topItems: []
      });
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const todayBills = bills.filter(b => b.date.startsWith(today));

    // Calculate totals
    const totalRevenue = bills.reduce((sum, b) => sum + b.total, 0);
    const todayRevenue = todayBills.reduce((sum, b) => sum + b.total, 0);
    const totalItems = bills.reduce((sum, b) => sum + b.items.length, 0);

    // Calculate top items
    const itemMap = {};
    bills.forEach(bill => {
      bill.items.forEach(item => {
        if (!itemMap[item.name]) {
          itemMap[item.name] = { name: item.name, count: 0, revenue: 0 };
        }
        itemMap[item.name].count += item.quantity;
        itemMap[item.name].revenue += item.price * item.quantity;
      });
    });

    const topItems = Object.values(itemMap)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    setStats({
      totalBills: bills.length,
      totalRevenue,
      todayRevenue,
      totalItems,
      averageBillValue: bills.length > 0 ? totalRevenue / bills.length : 0,
      topItems
    });
  };

  return (
    <div className="dashboard">
      <div className="page-header">
        <h1>Dashboard</h1>
      </div>

      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-content">
            <p className="stat-label">Total Revenue</p>
            <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-content">
            <p className="stat-label">Total Bills</p>
            <p className="stat-value">{stats.totalBills}</p>
          </div>
        </div>

        <div className="stat-card tertiary">
          <div className="stat-content">
            <p className="stat-label">Today's Revenue</p>
            <p className="stat-value">₹{stats.todayRevenue.toFixed(2)}</p>
          </div>
        </div>

        <div className="stat-card quaternary">
          <div className="stat-content">
            <p className="stat-label">Items Sold</p>
            <p className="stat-value">{stats.totalItems}</p>
          </div>
        </div>

        <div className="stat-card quinary">
          <div className="stat-content">
            <p className="stat-label">Avg Bill Value</p>
            <p className="stat-value">₹{stats.averageBillValue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {stats.topItems.length > 0 && (
        <div className="top-items-section">
          <h2>Top Selling Items</h2>
          <div className="top-items-container">
            {stats.topItems.map((item, idx) => (
              <div key={idx} className="top-item">
                <div className="rank">#{idx + 1}</div>
                <h3>{item.name}</h3>
                <p className="quantity">{item.count} units</p>
                <p className="revenue">₹{item.revenue.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {bills.length === 0 && (
        <div className="empty-state">
          <p className="empty-title">No Data Available</p>
          <p className="empty-desc">Create your first bill to see statistics here</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
