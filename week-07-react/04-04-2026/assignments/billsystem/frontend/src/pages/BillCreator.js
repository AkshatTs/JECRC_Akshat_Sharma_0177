import React, { useState } from 'react';
import { toast } from 'react-toastify';
import BillItemSelector from '../components/BillItemSelector';
import BillItemList from '../components/BillItemList';
import BillCalculations from '../components/BillCalculations';
import BillActions from '../components/BillActions';
import '../styles/BillCreator.css';

function BillCreator({ bills, onSaveBill, catalogs }) {
  const [items, setItems] = useState([]);
  const [discountType, setDiscountType] = useState('none');
  const [discountValue, setDiscountValue] = useState(0);
  const [taxRate, setTaxRate] = useState(18);
  const [billNumber, setBillNumber] = useState(`INV-${Date.now()}`);

  const addItem = (item, quantity = 1) => {
    const existingItem = items.find(i => i.id === item.id && i.catalog === item.catalog);
    
    if (existingItem) {
      const updatedItems = items.map(i =>
        i.id === item.id && i.catalog === item.catalog
          ? { ...i, quantity: i.quantity + quantity }
          : i
      );
      setItems(updatedItems);
    } else {
      setItems([...items, { ...item, quantity, lineId: Math.random() }]);
    }
  };

  const updateItemQuantity = (lineId, quantity) => {
    if (quantity <= 0) {
      removeItem(lineId);
    } else {
      setItems(items.map(i => i.lineId === lineId ? { ...i, quantity } : i));
    }
  };

  const updateItemPrice = (lineId, price) => {
    setItems(items.map(i => i.lineId === lineId ? { ...i, price } : i));
  };

  const removeItem = (lineId) => {
    setItems(items.filter(i => i.lineId !== lineId));
  };

  const calculateSubtotal = () => {
    return items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const calculateDiscount = () => {
    const subtotal = calculateSubtotal();
    if (discountType === 'percentage') {
      return (subtotal * discountValue) / 100;
    } else if (discountType === 'fixed') {
      return discountValue;
    }
    return 0;
  };

  const calculateTax = () => {
    const subtotal = calculateSubtotal();
    const discount = calculateDiscount();
    return ((subtotal - discount) * taxRate) / 100;
  };

  const calculateTotal = () => {
    return calculateSubtotal() - calculateDiscount() + calculateTax();
  };

  const saveBill = () => {
    if (items.length === 0) {
      toast.error('Please add at least one item to create a bill');
      return;
    }

    const newBill = {
      id: billNumber,
      date: new Date().toLocaleString(),
      items,
      subtotal: calculateSubtotal(),
      discount: calculateDiscount(),
      discountType,
      discountValue,
      tax: calculateTax(),
      taxRate,
      total: calculateTotal(),
      invoice: billNumber
    };

    onSaveBill([...bills, newBill]);
    toast.success('Bill saved successfully!');
    resetForm();
  };

  const resetForm = () => {
    setItems([]);
    setDiscountType('none');
    setDiscountValue(0);
    setTaxRate(18);
    setBillNumber(`INV-${Date.now()}`);
  };

  const saveDraft = () => {
    if (items.length === 0) {
      toast.error('Please add at least one item to save as draft');
      return;
    }

    const draft = {
      id: `DRAFT-${Date.now()}`,
      items,
      discountType,
      discountValue,
      taxRate,
      isDraft: true,
      savedDate: new Date().toLocaleString()
    };

    const drafts = JSON.parse(localStorage.getItem('drafts')) || [];
    localStorage.setItem('drafts', JSON.stringify([...drafts, draft]));
    toast.success('Draft saved!');
  };

  return (
    <div className="bill-creator">
      <h1>Create New Bill</h1>
      
      <div className="bill-container">
        <div className="left-section">
          <BillItemSelector catalogs={catalogs} onAddItem={addItem} />
        </div>

        <div className="right-section">
          <div className="invoice-section">
            <div className="invoice-header">
              <h2>Invoice #{billNumber}</h2>
              <p className="invoice-date">{new Date().toLocaleString()}</p>
            </div>

            <BillItemList 
              items={items}
              onUpdateQuantity={updateItemQuantity}
              onUpdatePrice={updateItemPrice}
              onRemoveItem={removeItem}
            />

            <BillCalculations
              subtotal={calculateSubtotal()}
              discount={calculateDiscount()}
              discountType={discountType}
              discountValue={discountValue}
              onDiscountTypeChange={setDiscountType}
              onDiscountValueChange={setDiscountValue}
              taxRate={taxRate}
              onTaxRateChange={setTaxRate}
              tax={calculateTax()}
              total={calculateTotal()}
            />

            <BillActions
              onSaveBill={saveBill}
              onSaveDraft={saveDraft}
              onReset={resetForm}
              items={items}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillCreator;
