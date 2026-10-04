import { Link } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="text-center mb-4">

  <img
    src="/LOGO.png"
    alt="ABC Jewellers"
    className="sidebar-logo"
    
  />

  <h5
    style={{
      color: "#D4AF37",
      marginTop: "10px",
      fontWeight: "bold"
    }}
  >
    ABC Reddy Jewellers
  </h5>

  <p
    style={{
      color: "#B8860B",
      fontSize: "13px"
    }}
  >
    Since 2004
  </p>

</div>

      <hr />

      <div className="d-flex flex-column">

        <Link
          to="/admin/dashboard"
          className="btn sidebar-btn text-start"
        >
          🏠 Dashboard
        </Link>

        <Link
          to="/admin/customers"
          className="btn sidebar-btn text-start"
        >
          👥 Customers
        </Link>

        <Link
          to="/admin/ornaments"
          className="btn sidebar-btn text-start"
        >
          💍 Ornaments
        </Link>

        <Link
          to="/admin/purchases"
          className="btn sidebar-btn text-start"
        >
          🛒 Purchases
        </Link>

        <Link
          to="/admin/pending"
          className="btn sidebar-btn text-start"
        >
          💰 Pending Payments
        </Link>

        <Link
          to="/admin/reports"
          className="btn sidebar-btn text-start"
        >
          📊 Reports
        </Link>

      </div>
    </div>
  );
}

export default Sidebar;
