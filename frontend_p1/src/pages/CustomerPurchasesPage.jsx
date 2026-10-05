import React, { useState, useEffect } from 'react';
import axios from '../api';

export default function CustomerPurchasesPage() {
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const res = await axios.get('/purchases');
      setPurchases(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>My Purchases</h1>
      {loading ? <p>Loading...</p> : (
        <div style={{ background: '#1a1a1a', borderRadius: '8px', overflow: 'hidden', border: '1px solid #333' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ background: '#222', color: '#D4AF37' }}>
              <tr>
                <th style={{ padding: '15px' }}>Date</th>
                <th style={{ padding: '15px' }}>Ornament ID</th>
                <th style={{ padding: '15px' }}>Weight</th>
                <th style={{ padding: '15px' }}>Total Cost</th>
                <th style={{ padding: '15px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map(p => (
                <tr key={p.purchaseId} style={{ borderTop: '1px solid #333' }}>
                  <td style={{ padding: '15px', color: '#ccc' }}>{p.purchaseDate}</td>
                  <td style={{ padding: '15px', color: '#fff' }}>{p.ornamentId}</td>
                  <td style={{ padding: '15px', color: '#ccc' }}>{p.totalWeight}g</td>
                  <td style={{ padding: '15px', color: '#D4AF37', fontWeight: 'bold' }}>₹{p.totalCost}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ 
                      padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem',
                      background: p.status === 'PENDING' ? '#B8860B' : (p.status === 'COMPLETED' ? '#2E8B57' : '#555'),
                      color: '#fff'
                    }}>
                      {p.status || 'PENDING'}
                    </span>
                  </td>
                </tr>
              ))}
              {purchases.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ padding: '15px', textAlign: 'center', color: '#888' }}>You have no purchases yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
