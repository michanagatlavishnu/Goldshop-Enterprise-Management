import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import CustomerLayout from "./layouts/CustomerLayout";
import LoginPage from "./pages/auth/LoginPage";
import SignupPage from "./pages/auth/SignupPage";

// Admin Pages
import DashboardPage from "./pages/DashboardPage";
import CustomerPage from "./pages/CustomerPage";
import OrnamentPage from "./pages/OrnamentPage";
import PurchasePage from "./pages/PurchasePage";
import PendingPurchasesPage from "./pages/PendingPurchasesPage";
import ReportsPage from "./pages/ReportsPage";
import UsersPage from "./pages/UsersPage";

// Customer Pages (Placeholder components for now to prevent errors)
const CustomerHome = () => <div><h2>Customer Home</h2><p>Welcome to your premium jewellery portal.</p></div>;
const CustomerProfile = () => <div><h2>My Profile</h2><p>Manage your details here.</p></div>;

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        {/* ADMIN PORTAL */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="customers" element={<CustomerPage />} />
          <Route path="ornaments" element={<OrnamentPage />} />
          <Route path="purchases" element={<PurchasePage />} />
          <Route path="pending" element={<PendingPurchasesPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="users" element={<UsersPage />} />
        </Route>

        {/* CUSTOMER PORTAL */}
        <Route path="/customer" element={<CustomerLayout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<CustomerHome />} />
          <Route path="profile" element={<CustomerProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;