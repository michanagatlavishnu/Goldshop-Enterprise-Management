import React, { useState, useEffect } from 'react';
import axios from '../api';

export default function AdminGoldRatesPage() {
  const [rates, setRates] = useState({ gold24: 0, gold22: 0, gold18: 0, silver: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const res = await axios.get('/goldrates');
      if (res.data) setRates(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put('/goldrates', rates);
      alert('Gold rates updated! All ornament prices recalculated.');
    } catch (err) {
      alert('Failed to update gold rates.');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ background: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <h2 style={{ marginBottom: '20px' }}>Manage Gold Rates</h2>
      <form onSubmit={handleUpdate} style={{ maxWidth: '400px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>24K Gold (per 10g)</label>
          <input type="number" value={rates.gold24} onChange={e => setRates({...rates, gold24: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>22K Gold (per 10g)</label>
          <input type="number" value={rates.gold22} onChange={e => setRates({...rates, gold22: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>18K Gold (per 10g)</label>
          <input type="number" value={rates.gold18} onChange={e => setRates({...rates, gold18: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Silver (per 10g)</label>
          <input type="number" value={rates.silver} onChange={e => setRates({...rates, silver: e.target.value})} style={{ width: '100%', padding: '8px' }} required />
        </div>
        <button type="submit" style={{ padding: '10px 20px', background: '#D4AF37', border: 'none', color: '#000', fontWeight: 'bold', cursor: 'pointer', borderRadius: '4px' }}>
          Update Rates
        </button>
      </form>
    </div>
  );
}
