import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../../api';
import './Auth.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });
      const { token, role } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      
      // Role-based routing
      if (role === 'ADMIN' || role === 'MANAGER' || role === 'STAFF') {
        navigate('/admin/dashboard');
      } else {
        navigate('/customer/home');
      }
    } catch (err) {
      if (!err.response) {
        setError('Unable to connect to the server. Please try again.');
      } else if (err.response.status === 401) {
        setError('Invalid email or password.');
      } else if (err.response.status === 403) {
        setError('Your account is inactive or you do not have permission.');
      } else if (err.response.status === 500) {
        setError('Authentication service is temporarily unavailable.');
      } else {
        setError(err.response.data?.message || 'An error occurred during login. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-left">
        <div className="auth-brand">
          <h1>GoldShop Enterprise</h1>
          <p>Smart Management for Modern Gold Businesses</p>
        </div>
      </div>
      <div className="auth-right">
        <div className="auth-card">
          <h2>Welcome Back</h2>
          <p className="auth-subtitle">Sign in to your GoldShop account</p>
          
          {error && <div className="auth-error">{error}</div>}
          
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required 
                placeholder="Enter your email"
              />
            </div>
            
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required 
                placeholder="Enter your password"
              />
            </div>
            
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Signing in...' : 'Login'}
            </button>
          </form>
          
          <div className="auth-divider"></div>
          
          <div className="auth-footer">
            <span>Don't have an account? </span>
            <Link to="/signup">Create Account</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
