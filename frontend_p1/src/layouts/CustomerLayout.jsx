import React from 'react';
import { Outlet, Navigate, Link, useNavigate } from 'react-router-dom';

export default function CustomerLayout() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#121212', color: '#fff' }}>
      {/* Customer Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '20px 40px', 
        backgroundColor: '#1a1a1a',
        color: '#D4AF37',
        alignItems: 'center',
        borderBottom: '1px solid #333'
      }}>
        <h2 style={{ margin: 0 }}>GoldShop</h2>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/customer/home" style={{ color: '#D4AF37', textDecoration: 'none' }}>Home</Link>
          <Link to="/customer/ornaments" style={{ color: '#D4AF37', textDecoration: 'none' }}>Jewellery</Link>
          <Link to="/customer/purchases" style={{ color: '#D4AF37', textDecoration: 'none' }}>My Purchases</Link>
          <Link to="/customer/profile" style={{ color: '#D4AF37', textDecoration: 'none' }}>Profile</Link>
          <button 
            onClick={handleLogout}
            style={{ 
              background: 'transparent', 
              border: '1px solid #D4AF37', 
              color: '#D4AF37', 
              padding: '8px 16px', 
              borderRadius: '4px',
              cursor: 'pointer' 
            }}
          >
            Logout
          </button>
        </nav>
      </header>
      
      {/* Page Content */}
      <div style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
        <Outlet />
      </div>
    </div>
  );
}
