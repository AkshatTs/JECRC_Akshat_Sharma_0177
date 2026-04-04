import React from 'react';
import '../styles/components.css';

function BillItemList({ items, onUpdateQuantity, onUpdatePrice, onRemoveItem }) {
  return (
    <div className="bill-items">
      <table className="items-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.lineId} className="bill-row">
              <td className="item-name-cell">{item.name}</td>
              <td>
                <input 
                  type="number"
                  value={item.price}
                  onChange={(e) => onUpdatePrice(item.lineId, parseFloat(e.target.value))}
                  className="input-small"
                />
              </td>
              <td>
                <input 
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => onUpdateQuantity(item.lineId, parseInt(e.target.value))}
                  className="input-small"
                />
              </td>
              <td className="amount">₹{(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button 
                  className="btn-delete"
                  onClick={() => onRemoveItem(item.lineId)}
                  title="Remove"
                >
                  ✕
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {items.length === 0 && (
        <p className="no-items">No items added yet. Select items from the left panel.</p>
      )}
    </div>
  );
}

export default BillItemList;
