// src/pages/Dashboard.tsx
import React from 'react';
import type { Product } from '../types';

interface Props {
  products: Product[];
}

const Dashboard: React.FC<Props> = ({ products }) => {
  const totalItems = products.length;

  const totalValue = products.reduce(
    (acc, p) => acc + p.price * p.quantity,
    0
  );

  const outOfStock = products.filter(p => p.quantity === 0).length;

  const formatPrice = (n: number) =>
    n.toLocaleString('th-TH', { style: 'currency', currency: 'THB', maximumFractionDigits: 0 });

  const cards = [
    {
      label: 'จำนวนสินค้าทั้งหมด',
      value: `${totalItems} ชนิด`,
      icon: '🗂️',
      color: 'card-blue',
    },
    {
      label: 'มูลค่ารวมของสต๊อก',
      value: formatPrice(totalValue),
      icon: '💰',
      color: 'card-green',
    },
    {
      label: 'สินค้าที่ของหมด',
      value: `${outOfStock} รายการ`,
      icon: '⚠️',
      color: outOfStock > 0 ? 'card-red' : 'card-gray',
    },
  ];

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">ภาพรวมสต๊อกสินค้า</h1>
        <p className="page-subtitle">สรุปข้อมูลสินค้าในคลังทั้งหมด</p>
      </div>

      <div className="stats-grid">
        {cards.map((c) => (
          <div key={c.label} className={`stat-card ${c.color}`}>
            <div className="stat-icon">{c.icon}</div>
            <div className="stat-info">
              <p className="stat-label">{c.label}</p>
              <p className="stat-value">{c.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Product table preview */}
      <div className="section-card">
        <h2 className="section-title">รายการสินค้าล่าสุด</h2>
        {products.length === 0 ? (
          <p className="empty-msg">ยังไม่มีสินค้า</p>
        ) : (
          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ชื่อสินค้า</th>
                  <th>ราคา</th>
                  <th>จำนวน</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {products.map((p) => (
                  <tr key={p.id} className={p.quantity === 0 ? 'row-oos' : ''}>
                    <td>{p.name}</td>
                    <td>{p.price.toLocaleString()} ฿</td>
                    <td>{p.quantity}</td>
                    <td>
                      {p.quantity === 0 ? (
                        <span className="badge-oos">สินค้าหมด</span>
                      ) : p.quantity <= 3 ? (
                        <span className="badge-low">ใกล้หมด</span>
                      ) : (
                        <span className="badge-ok">พร้อมขาย</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
