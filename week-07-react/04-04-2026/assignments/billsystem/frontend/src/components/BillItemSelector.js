import React, { useState } from 'react';
import '../styles/components.css';

function BillItemSelector({ catalogs, onAddItem }) {
  const [selectedCatalog, setSelectedCatalog] = useState('entrance');
  const [customItem, setCustomItem] = useState({ name: '', price: 0 });
  const [quantity, setQuantity] = useState(1);

  const currentItems = catalogs[selectedCatalog] || [];

  const handleAddItem = (item) => {
    onAddItem(item, quantity);
    setQuantity(1);
  };

  const handleAddCustomItem = () => {
    if (!customItem.name.trim()) {
      alert('Please enter item name');
      return;
    }
    if (customItem.price <= 0) {
      alert('Please enter valid price');
      return;
    }

    onAddItem({
      id: `CUSTOM-${Date.now()}`,
      name: customItem.name,
      price: parseFloat(customItem.price),
      catalog: 'custom',
      category: 'Custom'
    }, quantity);

    setCustomItem({ name: '', price: 0 });
    setQuantity(1);
  };

  return (
    <div className="item-selector">
      <h2>Add Items</h2>

      <div className="catalog-tabs">
        <button 
          className={`tab ${selectedCatalog === 'entrance' ? 'active' : ''}`}
          onClick={() => setSelectedCatalog('entrance')}
        >
          🎟️ Entrance
        </button>
        <button 
          className={`tab ${selectedCatalog === 'donation' ? 'active' : ''}`}
          onClick={() => setSelectedCatalog('donation')}
        >
          ❤️ Donation
        </button>
        <button 
          className={`tab ${selectedCatalog === 'selling' ? 'active' : ''}`}
          onClick={() => setSelectedCatalog('selling')}
        >
          🛍️ Selling
        </button>
      </div>

      <div className="items-list">
        {currentItems.map(item => (
          <div key={item.id} className="catalog-item">
            <div className="item-info">
              <p className="item-name">{item.name}</p>
              <p className="item-price">₹{item.price}</p>
            </div>
            <div className="item-actions">
              <input 
                type="number" 
                min="1" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="qty-input"
              />
              <button 
                className="btn-add"
                onClick={() => handleAddItem(item)}
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="custom-item-section">
        <h3>Add Custom Item</h3>
        <input 
          type="text"
          placeholder="Item name"
          value={customItem.name}
          onChange={(e) => setCustomItem({...customItem, name: e.target.value})}
          className="input-field"
        />
        <input 
          type="number"
          placeholder="Price"
          value={customItem.price || ''}
          onChange={(e) => setCustomItem({...customItem, price: parseFloat(e.target.value) || 0})}
          className="input-field"
        />
        <input 
          type="number" 
          min="1"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
          className="input-field"
          placeholder="Quantity"
        />
        <button className="btn-custom" onClick={handleAddCustomItem}>
          Add Custom Item
        </button>
      </div>
    </div>
  );
}

export default BillItemSelector;
