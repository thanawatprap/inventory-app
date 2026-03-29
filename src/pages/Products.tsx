// src/pages/Products.tsx
import React, { useState } from 'react';
import type { Product } from '../types';
import AddProductForm from '../components/AddProductForm';
import ProductCard from '../components/ProductCard';

interface Props {
  products: Product[];
  onAdd: (name: string, price: number, quantity: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
  onDelete: (id: number) => void;
}

const Products: React.FC<Props> = ({ products, onAdd, onUpdateQuantity, onDelete }) => {
  const [search, setSearch] = useState('');

  const filtered = products.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">จัดการสินค้า</h1>
        <p className="page-subtitle">เพิ่ม ลบ และปรับจำนวนสต๊อกสินค้า</p>
      </div>

      <AddProductForm onSubmit={onAdd} />

      {/* Search */}
      <div className="search-wrap">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="ค้นหาสินค้า..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="search-input"
        />
        {search && (
          <button className="search-clear" onClick={() => setSearch('')}>✕</button>
        )}
      </div>

      {/* Results count */}
      {search && (
        <p className="search-result-label">
          พบ {filtered.length} รายการ สำหรับ "{search}"
        </p>
      )}

      {/* Product list */}
      {filtered.length === 0 ? (
        <div className="empty-state">
          <p className="empty-icon">📭</p>
          <p className="empty-msg">{search ? 'ไม่พบสินค้าที่ค้นหา' : 'ยังไม่มีสินค้า กรุณาเพิ่มสินค้าใหม่'}</p>
        </div>
      ) : (
        <div className="product-grid">
          {filtered.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              onUpdateQuantity={onUpdateQuantity}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
