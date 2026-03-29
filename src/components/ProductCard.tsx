// src/components/ProductCard.tsx
import React from 'react';
import type { Product } from '../types';

interface Props {
  product: Product;
  onUpdateQuantity: (id: number, delta: number) => void;
  onDelete: (id: number) => void;
}

const ProductCard: React.FC<Props> = ({ product, onUpdateQuantity, onDelete }) => {
  const isOos = product.quantity === 0;
  const isLow = product.quantity > 0 && product.quantity <= 3;

  return (
    <div className={`product-card ${isOos ? 'card-oos' : ''}`}>
      {/* Header row */}
      <div className="card-header">
        <h3 className="card-name">{product.name}</h3>
        {isOos && <span className="badge-oos">สินค้าหมด</span>}
        {isLow && <span className="badge-low">ใกล้หมด</span>}
      </div>

      {/* Price */}
      <p className="card-price">{product.price.toLocaleString()} ฿</p>

      {/* Quantity controls */}
      <div className="qty-row">
        <button
          onClick={() => onUpdateQuantity(product.id, -1)}
          disabled={product.quantity === 0}
          className="qty-btn minus"
        >
          −
        </button>
        <span className={`qty-value ${isOos ? 'qty-zero' : ''}`}>
          {product.quantity}
        </span>
        <button
          onClick={() => onUpdateQuantity(product.id, 1)}
          className="qty-btn plus"
        >
          +
        </button>
      </div>

      {/* Stock value */}
      <p className="card-stock-value">
        มูลค่า: {(product.price * product.quantity).toLocaleString()} ฿
      </p>

      {/* Delete */}
      <button onClick={() => onDelete(product.id)} className="btn-delete">
        🗑 ลบสินค้า
      </button>
    </div>
  );
};

export default ProductCard;
