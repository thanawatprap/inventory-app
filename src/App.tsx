// src/App.tsx
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import { useInventory } from './hooks/useInventory';

function App() {
  const { products, addProduct, updateQuantity, deleteProduct } = useInventory();

  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: 'var(--bg-main)' }}>
        {/* Top Nav */}
        <header className="nav-bar">
          <div className="nav-inner">
            <div className="nav-logo">
              <span className="logo-icon">📦</span>
              <span className="logo-text">StockFlow</span>
            </div>
            <nav className="nav-links">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                จัดการสินค้า
              </NavLink>
            </nav>
          </div>
        </header>

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard products={products} />} />
            <Route
              path="/products"
              element={
                <Products
                  products={products}
                  onAdd={addProduct}
                  onUpdateQuantity={updateQuantity}
                  onDelete={deleteProduct}
                />
              }
            />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
