import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/BillHistory.css';

function BillHistory({ bills, onDeleteBill }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [viewingBill, setViewingBill] = useState(null);

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || bill.date.startsWith(filterDate);
    return matchesSearch && matchesDate;
  });

  const deleteBill = (id) => {
    if (window.confirm('Are you sure you want to delete this bill?')) {
      onDeleteBill(bills.filter(b => b.id !== id));
      toast.success('Bill deleted!');
      setViewingBill(null);
    }
  };

  const exportAllBillsCSV = () => {
    if (bills.length === 0) {
      toast.error('No bills to export');
      return;
    }

    let csv = 'Invoice #,Date,Items,Subtotal,Discount,Tax,Total\n';
    bills.forEach(bill => {
      const itemList = bill.items.map(i => `${i.name}(${i.quantity})`).join('; ');
      csv += `"${bill.id}","${bill.date}","${itemList}",${bill.subtotal},${bill.discount},${bill.tax},${bill.total}\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    element.setAttribute('download', `bills-${Date.now()}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast.success('Bills exported as CSV!');
  };

  const getDailySummary = () => {
    const today = new Date().toISOString().split('T')[0];
    const todayBills = bills.filter(b => b.date.startsWith(today));
    
    if (todayBills.length === 0) return null;

    const totalSales = todayBills.reduce((sum, b) => sum + b.total, 0);
    const totalItems = todayBills.reduce((sum, b) => sum + b.items.length, 0);

    return { count: todayBills.length, totalSales, totalItems };
  };

  const dailySummary = getDailySummary();

  return (
    <div className="bill-history">
      <h1>Bill History</h1>

      {dailySummary && (
        <div className="daily-summary">
          <div className="summary-card">
            <p className="label">Today's Bills</p>
            <p className="value">{dailySummary.count}</p>
          </div>
          <div className="summary-card">
            <p className="label">Total Sales</p>
            <p className="value">₹{dailySummary.totalSales.toFixed(2)}</p>
          </div>
          <div className="summary-card">
            <p className="label">Items Sold</p>
            <p className="value">{dailySummary.totalItems}</p>
          </div>
        </div>
      )}

      <div className="filter-section">
        <input 
          type="text"
          placeholder="Search invoice #..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <input 
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
          className="date-input"
        />
        <button className="btn-export" onClick={exportAllBillsCSV}>
          📊 Export All
        </button>
      </div>

      <div className="bills-container">
        <div className="bills-list">
          <h2>Bills ({filteredBills.length})</h2>
          
          {filteredBills.length === 0 ? (
            <p className="no-bills">No bills found</p>
          ) : (
            <div className="list">
              {filteredBills.map(bill => (
                <div 
                  key={bill.id} 
                  className={`bill-item ${viewingBill?.id === bill.id ? 'active' : ''}`}
                  onClick={() => setViewingBill(bill)}
                >
                  <div className="bill-item-header">
                    <h3>{bill.id}</h3>
                    <span className="bill-amount">₹{bill.total.toFixed(2)}</span>
                  </div>
                  <p className="bill-date">{bill.date}</p>
                  <p className="bill-items">{bill.items.length} items</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {viewingBill && (
          <div className="bill-detail">
            <h2>Invoice Details</h2>
            <div className="detail-content">
              <div className="detail-header">
                <h3>Invoice #{viewingBill.id}</h3>
                <p className="date">{viewingBill.date}</p>
              </div>

              <table className="detail-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingBill.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>{item.quantity}</td>
                      <td>₹{(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="detail-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₹{viewingBill.subtotal.toFixed(2)}</span>
                </div>
                {viewingBill.discount > 0 && (
                  <div className="total-row">
                    <span>Discount ({viewingBill.discountType}):</span>
                    <span>-₹{viewingBill.discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="total-row">
                  <span>Tax ({viewingBill.taxRate}%):</span>
                  <span>₹{viewingBill.tax.toFixed(2)}</span>
                </div>
                <div className="total-row final">
                  <span>TOTAL:</span>
                  <span>₹{viewingBill.total.toFixed(2)}</span>
                </div>
              </div>

              <div className="detail-actions">
                <button className="btn-print" onClick={() => window.print()}>
                  🖨️ Print
                </button>
                <button 
                  className="btn-delete" 
                  onClick={() => deleteBill(viewingBill.id)}
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BillHistory;
