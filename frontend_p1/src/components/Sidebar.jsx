import { Link, useNavigate } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/login');
  };

  return (
    <div className="sidebar" style={{ 
      width: '250px', 
      position: 'fixed', 
      height: '100vh', 
      background: '#1a1a1a', 
      borderRight: '1px solid #333',
      display: 'flex',
      flexDirection: 'column',
      padding: '20px'
    }}>
      <div className="text-center mb-4" style={{ textAlign: 'center' }}>
        <h5 style={{ color: "#D4AF37", marginTop: "10px", fontWeight: "bold", fontSize: '1.2rem' }}>
          GoldShop Admin
        </h5>
        <p style={{ color: "#B8860B", fontSize: "13px" }}>Enterprise Management</p>
      </div>

      <hr style={{ borderColor: '#333' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '20px', flex: 1 }}>
        <Link to="/admin/dashboard" className="sidebar-link">Dashboard</Link>
        <Link to="/admin/customers" className="sidebar-link">Customers</Link>
        <Link to="/admin/users" className="sidebar-link">Users</Link>
        <Link to="/admin/ornaments" className="sidebar-link">Ornaments</Link>
        <Link to="/admin/purchases" className="sidebar-link">Purchases</Link>
        <Link to="/admin/pending" className="sidebar-link">Pending Payments</Link>
        <Link to="/admin/goldrates" className="sidebar-link">Gold Rates</Link>
        <Link to="/admin/reports" className="sidebar-link">Reports</Link>
      </div>

      <div style={{ marginTop: 'auto' }}>
        <button 
          onClick={handleLogout}
          style={{ 
            width: '100%', 
            padding: '10px', 
            background: 'transparent', 
            border: '1px solid #D4AF37', 
            color: '#D4AF37', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
