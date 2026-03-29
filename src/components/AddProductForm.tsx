// src/components/AddProductForm.tsx
import React, { useState } from 'react';

interface Props {
  onSubmit: (name: string, price: number, quantity: number) => void;
}

const AddProductForm: React.FC<Props> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !quantity) return;
    const p = parseFloat(price);
    const q = parseInt(quantity);
    if (isNaN(p) || isNaN(q) || p < 0 || q < 0) return;
    onSubmit(name.trim(), p, q);
    setName('');
    setPrice('');
    setQuantity('');
  };

  return (
    <div className="form-card">
      <h2 className="form-title">➕ เพิ่มสินค้าใหม่</h2>
      <form onSubmit={handleSubmit} className="add-form">
        <div className="form-field">
          <label className="form-label">ชื่อสินค้า</label>
          <input
            type="text"
            placeholder="เช่น iPhone 15 Pro"
            value={name}
            onChange={e => setName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label className="form-label">ราคา (฿)</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={price}
            onChange={e => setPrice(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-field">
          <label className="form-label">จำนวนเริ่มต้น</label>
          <input
            type="number"
            placeholder="0"
            min="0"
            value={quantity}
            onChange={e => setQuantity(e.target.value)}
            className="form-input"
          />
        </div>
        <button type="submit" className="btn-add">
          เพิ่มสินค้า
        </button>
      </form>
    </div>
  );
};

export default AddProductForm;
