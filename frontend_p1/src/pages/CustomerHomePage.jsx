import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from '../api';

export default function CustomerHomePage() {
  const [goldRate, setGoldRate] = useState(null);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGoldRate = async () => {
    try {
      const res = await axios.get('/goldrates');
      setGoldRate(res.data);
    } catch (err) {
      console.error('Failed to fetch gold rates', err);
    }
  };

  const fetchFeatured = async () => {
    try {
      const res = await axios.get('/ornaments');
      setFeatured(res.data.slice(0, 4));
    } catch (err) {
      console.error('Failed to fetch featured ornaments', err);
    }
  };

  useEffect(() => {
    fetchGoldRate();
    fetchFeatured();
    const interval = setInterval(fetchGoldRate, 60000); // 60s polling
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        textAlign: 'center', 
        padding: '60px 20px', 
        background: 'linear-gradient(135deg, #1f1f1f 0%, #121212 100%)',
        borderRadius: '12px',
        marginBottom: '40px',
        border: '1px solid #333'
      }}>
        <h1 style={{ color: '#D4AF37', fontSize: '3rem', marginBottom: '10px' }}>Discover Timeless Elegance</h1>
        <p style={{ fontSize: '1.2rem', color: '#ccc', marginBottom: '30px' }}>Premium jewellery crafted for every occasion.</p>
        <Link to="/customer/ornaments" style={{
          background: '#D4AF37', color: '#000', padding: '12px 24px', 
          textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', marginRight: '15px'
        }}>Explore Jewellery</Link>
      </section>

      {/* Gold Rates */}
      <section style={{ marginBottom: '50px' }}>
        <h2 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Live Gold Rates</h2>
        {goldRate ? (
          <div style={{ display: 'flex', gap: '20px', marginTop: '20px', flexWrap: 'wrap' }}>
            {['24K', '22K', '18K'].map(k => {
              let price = 0;
              if(k === '24K') price = goldRate.gold24;
              if(k === '22K') price = goldRate.gold22;
              if(k === '18K') price = goldRate.gold18;
              return (
                <div key={k} style={{ 
                  flex: '1', minWidth: '200px', padding: '20px', 
                  background: '#1a1a1a', borderRadius: '8px', border: '1px solid #333', textAlign: 'center'
                }}>
                  <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>{k} Gold</h3>
                  <p style={{ fontSize: '1.5rem', color: '#D4AF37', margin: 0, fontWeight: 'bold' }}>₹{price} / 10g</p>
                </div>
              );
            })}
          </div>
        ) : <p>Loading gold rates...</p>}
        {goldRate && <p style={{ color: '#888', marginTop: '10px', fontSize: '0.9rem' }}>Last Updated: {new Date(goldRate.lastUpdated).toLocaleString()}</p>}
      </section>

      {/* Featured Ornaments */}
      <section>
        <h2 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Featured Jewellery</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          {featured.map(o => (
            <div key={o.ornamentId} style={{ 
              background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' 
            }}>
              <h3 style={{ margin: '0 0 10px 0', color: '#fff' }}>{o.ornamentName}</h3>
              <p style={{ margin: '5px 0', color: '#ccc' }}>{o.category} | {o.purity}</p>
              <p style={{ margin: '5px 0', color: '#ccc' }}>Weight: {o.weight}g</p>
              <p style={{ fontSize: '1.2rem', color: '#D4AF37', fontWeight: 'bold', margin: '15px 0' }}>
                ₹{o.price ? o.price.toFixed(2) : 'N/A'}
              </p>
              <Link to="/customer/ornaments" style={{ color: '#D4AF37', textDecoration: 'none' }}>View Details</Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
