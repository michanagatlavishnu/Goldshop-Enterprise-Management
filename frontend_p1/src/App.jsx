import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CustomerPage";
import OrnamentPage from "./pages/OrnamentPage";
import PurchasePage from "./pages/PurchasePage";
import PendingPurchasesPage from "./pages/PendingPurchasesPage";
import ReportsPage from "./pages/ReportsPage";

function App() {
  return (
    <BrowserRouter>

      <div style={{ display: "flex" }}>

        <Sidebar />

        <div
  style={{
    flex: 1,
    padding: "30px",
    marginLeft: "300px",
    minHeight: "100vh",
    width: "calc(100% - 300px)"
  }}
>

          <Routes>

            <Route
              path="/"
              element={<Navigate to="/dashboard" />}
            />

            <Route
              path="/dashboard"
              element={<DashboardPage />}
            />

            <Route
              path="/customers"
              element={<CustomerPage />}
            />

            <Route
              path="/ornaments"
              element={<OrnamentPage />}
            />

            <Route
              path="/purchases"
              element={<PurchasePage />}
            />

            <Route
              path="/pending"
              element={<PendingPurchasesPage />}
            />

            <Route
              path="/reports"
              element={<ReportsPage />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;