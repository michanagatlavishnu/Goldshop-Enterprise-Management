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
    <div style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Customer Header */}
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        padding: '20px 40px', 
        backgroundColor: '#121212',
        color: '#D4AF37',
        alignItems: 'center'
      }}>
        <h2 style={{ margin: 0 }}>GoldShop</h2>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <Link to="/customer/home" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link>
          <Link to="/customer/profile" style={{ color: '#fff', textDecoration: 'none' }}>Profile</Link>
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
