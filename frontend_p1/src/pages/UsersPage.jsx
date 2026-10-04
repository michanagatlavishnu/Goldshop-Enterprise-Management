import React, { useEffect, useState } from 'react';
import axios from '../api';

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (err) {
      if(err.response?.status === 403) {
         setError('Access Denied: You do not have ADMIN privileges.');
      } else {
         setError('Error loading users.');
      }
    }
  };

  const toggleActivation = async (id, enabled) => {
    try {
      await axios.put(`/api/users/${id}/activate?enabled=${enabled}`);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  const changeRole = async (id, role) => {
    try {
      await axios.put(`/api/users/${id}/role?role=${role}`);
      loadUsers();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>User Management</h2>
      {error ? (
        <div style={{color: 'red', padding: '20px', background: '#ffe6e6'}}>{error}</div>
      ) : (
        <table className="table table-bordered mt-4">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <select 
                    value={u.role} 
                    onChange={e => changeRole(u.id, e.target.value)}
                    className="form-select form-select-sm"
                  >
                    <option value="ADMIN">ADMIN</option>
                    <option value="MANAGER">MANAGER</option>
                    <option value="STAFF">STAFF</option>
                    <option value="CUSTOMER">CUSTOMER</option>
                  </select>
                </td>
                <td>
                  <span className={`badge ${u.enabled ? 'bg-success' : 'bg-danger'}`}>
                    {u.enabled ? 'Active' : 'Disabled'}
                  </span>
                </td>
                <td>
                  <button 
                    onClick={() => toggleActivation(u.id, !u.enabled)}
                    className={`btn btn-sm ${u.enabled ? 'btn-danger' : 'btn-success'}`}
                  >
                    {u.enabled ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
