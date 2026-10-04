import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

export default function AdminLayout() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== 'ADMIN' && role !== 'MANAGER' && role !== 'STAFF') {
    return <Navigate to="/customer/home" replace />;
  }

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div
        style={{
          flex: 1,
          padding: '30px',
          marginLeft: '300px',
          minHeight: '100vh',
          width: 'calc(100% - 300px)',
          backgroundColor: '#f5f5f5'
        }}
      >
        <Outlet />
      </div>
    </div>
  );
}
