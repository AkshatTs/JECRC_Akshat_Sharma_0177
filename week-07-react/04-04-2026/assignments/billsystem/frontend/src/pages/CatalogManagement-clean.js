import React, { useState } from 'react';
import { toast } from 'react-toastify';
import '../styles/CatalogManagement.css';

function CatalogManagement({ catalogs, onSaveCatalogs }) {
  const [selectedCatalog, setSelectedCatalog] = useState('entrance');
  const [newItem, setNewItem] = useState({ name: '', price: 0 });
  const [editingId, setEditingId] = useState(null);
  const [editingItem, setEditingItem] = useState({});

  const currentItems = catalogs[selectedCatalog] || [];

  const addItem = () => {
    if (!newItem.name.trim()) {
      toast.error('Item name is required');
      return;
    }
    if (newItem.price <= 0) {
      toast.error('Price must be greater than 0');
      return;
    }

    const updated = {
      ...catalogs,
      [selectedCatalog]: [
        ...currentItems,
        {
          id: Math.max(...currentItems.map(i => i.id), 0) + 1,
          ...newItem,
          price: parseFloat(newItem.price)
        }
      ]
    };

    onSaveCatalogs(updated);
    setNewItem({ name: '', price: 0 });
    toast.success('Item added successfully!');
  };

  const deleteItem = (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      const updated = {
        ...catalogs,
        [selectedCatalog]: currentItems.filter(i => i.id !== id)
      };
      onSaveCatalogs(updated);
      toast.success('Item deleted!');
    }
  };

  const startEdit = (item) => {
    setEditingId(item.id);
    setEditingItem({ ...item });
  };

  const saveEdit = () => {
    if (!editingItem.name.trim() || editingItem.price <= 0) {
      toast.error('Invalid item data');
      return;
    }

    const updated = {
      ...catalogs,
      [selectedCatalog]: currentItems.map(i =>
        i.id === editingId ? editingItem : i
      )
    };

    onSaveCatalogs(updated);
    setEditingId(null);
    toast.success('Item updated!');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingItem({});
  };

  return (
    <div className="catalog-management">
      <h1>Catalog Management</h1>

      <div className="catalog-selector">
        <button 
          className={`tab ${selectedCatalog === 'entrance' ? 'active' : ''}`}
          onClick={() => setSelectedCatalog('entrance')}
        >
          Entrance Fees
        </button>
        <button 
          className={`tab ${selectedCatalog === 'donation' ? 'active' : ''}`}
          onClick={() => setSelectedCatalog('donation')}
        >
          Donations
        </button>
        <button 
          className={`tab ${selectedCatalog === 'selling' ? 'active' : ''}`}
          onClick={() => setSelectedCatalog('selling')}
        >
          Selling Products
        </button>
      </div>

      <div className="catalog-content">
        <div className="add-item-section">
          <h2>Add New Item</h2>
          <div className="form-grid">
            <div className="form-group">
              <label>Item Name</label>
              <input 
                type="text"
                placeholder="Enter item name"
                value={newItem.name}
                onChange={(e) => setNewItem({...newItem, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input 
                type="number"
                placeholder="Enter price"
                value={newItem.price || ''}
                onChange={(e) => setNewItem({...newItem, price: parseFloat(e.target.value) || 0})}
              />
            </div>
          </div>
          <button className="btn-add-item" onClick={addItem}>Add Item</button>
        </div>

        <div className="items-list">
          {currentItems.length === 0 ? (
            <div className="no-items">No items in this catalog</div>
          ) : (
            currentItems.map(item => (
              <div key={item.id} className="item-card">
                {editingId === item.id ? (
                  <div style={{ flex: 1 }}>
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Name</label>
                        <input 
                          type="text"
                          value={editingItem.name}
                          onChange={(e) => setEditingItem({...editingItem, name: e.target.value})}
                        />
                      </div>
                      <div className="form-group">
                        <label>Price</label>
                        <input 
                          type="number"
                          value={editingItem.price}
                          onChange={(e) => setEditingItem({...editingItem, price: parseFloat(e.target.value)})}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="item-info">
                    <div className="item-field">
                      <label>Name</label>
                      <value>{item.name}</value>
                    </div>
                    <div className="item-field">
                      <label>Price</label>
                      <value>₹{item.price}</value>
                    </div>
                  </div>
                )}
                <div className="item-actions">
                  {editingId === item.id ? (
                    <>
                      <button className="btn-edit-item" onClick={saveEdit}>Save</button>
                      <button className="btn-delete-item" onClick={cancelEdit}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button className="btn-edit-item" onClick={() => startEdit(item)}>Edit</button>
                      <button className="btn-delete-item" onClick={() => deleteItem(item.id)}>Delete</button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default CatalogManagement;
