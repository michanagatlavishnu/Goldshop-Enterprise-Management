import React, { useState, useEffect } from "react";
import axios from "../api";
import { Modal, Button } from "react-bootstrap";
import "./DashboardPage.css";

function DashboardPage() {
  const [summary, setSummary] = useState({
    totalCustomers: 0,
    totalUsers: 0,
    totalOrnaments: 0,
    totalPurchases: 0,
    pendingPayments: 0,
    clearedPurchases: 0,
    todaysSales: 0,
    totalRevenue: 0
  });

  const [goldRates, setGoldRates] = useState(null);
  const [showRateModal, setShowRateModal] = useState(false);
  const [rateForm, setRateForm] = useState({
    gold24: 0, gold22: 0, gold18: 0, silver: 0, yesterdayGold22: 0
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const summaryRes = await axios.get('/dashboard/summary');
      setSummary(summaryRes.data);
      const rateRes = await axios.get('/goldrates');
      if (rateRes.data) {
        setGoldRates(rateRes.data);
        setRateForm(rateRes.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveRates = async () => {
    try {
      await axios.put('/goldrates', rateForm);
      alert("Rates Updated Successfully");
      setShowRateModal(false);
      loadDashboard();
    } catch (error) {
      console.error(error);
      alert("Failed to update rates");
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h1 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Dashboard Overview</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ccc', margin: 0, fontSize: '1rem' }}>Total Revenue</h3>
          <p style={{ color: '#D4AF37', fontSize: '2rem', margin: '10px 0 0 0', fontWeight: 'bold' }}>₹{summary.totalRevenue?.toLocaleString()}</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ccc', margin: 0, fontSize: '1rem' }}>Today's Sales</h3>
          <p style={{ color: '#D4AF37', fontSize: '2rem', margin: '10px 0 0 0', fontWeight: 'bold' }}>₹{summary.todaysSales?.toLocaleString()}</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ccc', margin: 0, fontSize: '1rem' }}>Pending Payments</h3>
          <p style={{ color: '#D4AF37', fontSize: '2rem', margin: '10px 0 0 0', fontWeight: 'bold' }}>{summary.pendingPayments}</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ccc', margin: 0, fontSize: '1rem' }}>Customers</h3>
          <p style={{ color: '#D4AF37', fontSize: '2rem', margin: '10px 0 0 0', fontWeight: 'bold' }}>{summary.totalCustomers}</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ccc', margin: 0, fontSize: '1rem' }}>Users</h3>
          <p style={{ color: '#D4AF37', fontSize: '2rem', margin: '10px 0 0 0', fontWeight: 'bold' }}>{summary.totalUsers}</p>
        </div>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          <h3 style={{ color: '#ccc', margin: 0, fontSize: '1rem' }}>Ornaments</h3>
          <p style={{ color: '#D4AF37', fontSize: '2rem', margin: '10px 0 0 0', fontWeight: 'bold' }}>{summary.totalOrnaments}</p>
        </div>
      </div>

      <div style={{ marginTop: '40px' }}>
        <h2 style={{ color: '#D4AF37', borderBottom: '1px solid #333', paddingBottom: '10px' }}>Live Gold Rates</h2>
        <div style={{ background: '#1a1a1a', padding: '20px', borderRadius: '8px', border: '1px solid #333' }}>
          {goldRates ? (
            <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ flex: 1 }}><strong>24K Gold:</strong> ₹{goldRates.gold24}/10g</div>
              <div style={{ flex: 1 }}><strong>22K Gold:</strong> ₹{goldRates.gold22}/10g</div>
              <div style={{ flex: 1 }}><strong>18K Gold:</strong> ₹{goldRates.gold18}/10g</div>
              <div style={{ flex: 1 }}><strong>Silver:</strong> ₹{goldRates.silver}/10g</div>
              <button 
                onClick={() => setShowRateModal(true)}
                style={{ background: '#D4AF37', color: '#000', padding: '8px 16px', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}
              >
                Update Rates
              </button>
            </div>
          ) : <p>Loading rates...</p>}
        </div>
      </div>

      <Modal show={showRateModal} onHide={() => setShowRateModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ color: '#000' }}>Update Gold Rates</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <label>24K Gold</label>
          <input type="number" className="form-control mb-2" value={rateForm.gold24} onChange={(e) => setRateForm({...rateForm, gold24: e.target.value})} />
          <label>22K Gold</label>
          <input type="number" className="form-control mb-2" value={rateForm.gold22} onChange={(e) => setRateForm({...rateForm, gold22: e.target.value})} />
          <label>18K Gold</label>
          <input type="number" className="form-control mb-2" value={rateForm.gold18} onChange={(e) => setRateForm({...rateForm, gold18: e.target.value})} />
          <label>Silver</label>
          <input type="number" className="form-control mb-2" value={rateForm.silver} onChange={(e) => setRateForm({...rateForm, silver: e.target.value})} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRateModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={saveRates} style={{ background: '#D4AF37', borderColor: '#D4AF37', color: '#000' }}>Save Rates</Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default DashboardPage;
