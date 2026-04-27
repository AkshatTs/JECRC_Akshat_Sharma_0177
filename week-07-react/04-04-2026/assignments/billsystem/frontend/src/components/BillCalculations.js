import React from 'react';
import '../styles/components.css';

function BillCalculations({
  subtotal,
  discount,
  discountType,
  discountValue,
  onDiscountTypeChange,
  onDiscountValueChange,
  taxRate,
  onTaxRateChange,
  tax,
  total
}) {
  return (
    <div className="bill-calculations">
      <div className="calculation-row">
        <span>Subtotal</span>
        <span className="amount">₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="discount-section">
        <div className="discount-controls">
          <select 
            value={discountType}
            onChange={(e) => onDiscountTypeChange(e.target.value)}
            className="select-field"
          >
            <option value="none">No Discount</option>
            <option value="percentage">Percentage (%)</option>
            <option value="fixed">Fixed Amount</option>
          </select>
          
          {discountType !== 'none' && (
            <input 
              type="number"
              value={discountValue || ''}
              onChange={(e) => onDiscountValueChange(parseFloat(e.target.value) || 0)}
              className="input-small"
              placeholder={discountType === 'percentage' ? '%' : '₹'}
            />
          )}
        </div>
        
        {discount > 0 && (
          <div className="calculation-row discount-row">
            <span>Discount</span>
            <span className="amount discount">-₹{discount.toFixed(2)}</span>
          </div>
        )}
      </div>

      <div className="tax-section">
        <div className="tax-controls">
          <label>Tax Rate (%)</label>
          <input 
            type="number"
            value={taxRate}
            onChange={(e) => onTaxRateChange(parseFloat(e.target.value) || 0)}
            className="input-small"
            min="0"
            max="100"
          />
        </div>
        <div className="calculation-row tax-row">
          <span>Tax ({taxRate}%)</span>
          <span className="amount">₹{tax.toFixed(2)}</span>
        </div>
      </div>

      <div className="calculation-row total-row">
        <span>TOTAL</span>
        <span className="amount total">₹{total.toFixed(2)}</span>
      </div>
    </div>
  );
}

export default BillCalculations;
