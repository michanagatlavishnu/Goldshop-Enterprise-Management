import React, { useState, useEffect } from 'react';
import axios from '../api';

export default function CustomerOrnamentsPage() {
  const [ornaments, setOrnaments] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrnaments();
  }, []);

  const fetchOrnaments = async () => {
    try {
      const res = await axios.get('/ornaments');
      setOrnaments(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEnquire = async (ornament) => {
    try {
      await axios.post('/purchases', {
        ornamentId: ornament.ornamentId,
        quantity: 1,
        totalWeight: ornament.weight,
        totalCost: ornament.price,
        paidAmount: 0.0,
        balanceAmount: ornament.price
      });
      alert('Purchase enquiry submitted successfully!');
    } catch (err) {
      alert(err.response?.data || 'Failed to submit purchase.');
    }
  };

  const filtered = ornaments.filter(o => {
    const matchesSearch = o.ornamentName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = category ? o.category === category : true;
    return matchesSearch && matchesCategory;
  });

  const categories = [...new Set(ornaments.map(o => o.category).filter(Boolean))];

  return (
    <div>
      <h1 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Explore Our Collection</h1>
      
      <div style={{ display: 'flex', gap: '20px', margin: '20px 0' }}>
        <input 
          type="text" 
          placeholder="Search jewellery..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px', flex: 1 }}
        />
        <select 
          value={category} 
          onChange={e => setCategory(e.target.value)}
          style={{ padding: '10px', background: '#1a1a1a', border: '1px solid #333', color: '#fff', borderRadius: '4px' }}
        >
          <option value="">All Categories</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {loading ? <p>Loading...</p> : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {filtered.map(o => (
            <div key={o.ornamentId} style={{ 
              background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' 
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>{o.ornamentName}</h3>
              <p style={{ margin: '5px 0', color: '#ccc' }}>{o.category} | {o.purity}</p>
              <p style={{ margin: '5px 0', color: '#ccc' }}>Weight: {o.weight}g</p>
              <p style={{ fontSize: '1.2rem', color: '#D4AF37', fontWeight: 'bold', margin: '15px 0' }}>
                ₹{o.price ? o.price.toFixed(2) : 'N/A'}
              </p>
              <button 
                onClick={() => handleEnquire(o)}
                style={{ 
                  width: '100%', padding: '10px', background: '#D4AF37', color: '#000', 
                  border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' 
                }}
              >
                Buy / Enquire
              </button>
            </div>
          ))}
          {filtered.length === 0 && <p style={{ color: '#888' }}>No ornaments found.</p>}
        </div>
      )}
    </div>
  );
}
