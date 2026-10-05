import React, { useState, useEffect } from 'react';
import axios from '../api';

export default function CustomerProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  // Form states
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  // Password states
  const [pwdMode, setPwdMode] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('/api/me');
      setProfile(res.data);
      setName(res.data.name || '');
      setPhone(res.data.phone || '');
      setAddress(res.data.address || '');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put('/api/me', { name, phone, address });
      setProfile(res.data);
      setEditMode(false);
      alert('Profile updated!');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/api/me/password', { oldPassword, newPassword });
      setPwdMode(false);
      setOldPassword('');
      setNewPassword('');
      alert('Password updated successfully!');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update password');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>Failed to load profile.</p>;

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>My Profile</h1>
      
      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '8px', border: '1px solid #333', marginBottom: '20px' }}>
        <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Email:</strong> {profile.email}</p>
        <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Role:</strong> {profile.role}</p>
        <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Status:</strong> {profile.enabled ? 'Active' : 'Inactive'}</p>
        {profile.memberSince && <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Member Since:</strong> {new Date(profile.memberSince).toLocaleDateString()}</p>}
        
        <hr style={{ borderColor: '#333', margin: '20px 0' }} />
        
        {!editMode ? (
          <div>
            <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Name:</strong> {profile.name}</p>
            <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Phone:</strong> {profile.phone || 'Not set'}</p>
            <p style={{ color: '#ccc', margin: '10px 0' }}><strong>Address:</strong> {profile.address || 'Not set'}</p>
            <button onClick={() => setEditMode(true)} style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px', fontWeight: 'bold' }}>Edit Profile</button>
          </div>
        ) : (
          <form onSubmit={handleUpdateProfile}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '5px' }}>Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} required />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '5px' }}>Phone</label>
              <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '5px' }}>Address</label>
              <textarea value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px', minHeight: '80px' }} />
            </div>
            <button type="submit" style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}>Save Changes</button>
            <button type="button" onClick={() => setEditMode(false)} style={{ background: 'transparent', color: '#ccc', border: '1px solid #555', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </form>
        )}
      </div>

      <div style={{ background: '#1a1a1a', padding: '30px', borderRadius: '8px', border: '1px solid #333' }}>
        <h2 style={{ color: '#fff', marginTop: 0, fontSize: '1.2rem' }}>Security</h2>
        {!pwdMode ? (
          <button onClick={() => setPwdMode(true)} style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', marginTop: '10px' }}>Change Password</button>
        ) : (
          <form onSubmit={handleUpdatePassword} style={{ marginTop: '15px' }}>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '5px' }}>Current Password</label>
              <input type="password" value={oldPassword} onChange={e => setOldPassword(e.target.value)} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} required />
            </div>
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', color: '#ccc', marginBottom: '5px' }}>New Password</label>
              <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} style={{ width: '100%', padding: '8px', background: '#222', border: '1px solid #333', color: '#fff', borderRadius: '4px' }} required />
            </div>
            <button type="submit" style={{ background: '#D4AF37', color: '#000', border: 'none', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginRight: '10px' }}>Update Password</button>
            <button type="button" onClick={() => setPwdMode(false)} style={{ background: 'transparent', color: '#ccc', border: '1px solid #555', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Cancel</button>
          </form>
        )}
      </div>
    </div>
  );
}
