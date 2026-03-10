import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import AdminDashboard from "../pages/admin/AdminDashboard";
import ManagerDashboard from "../pages/manager/ManagerDashboard";
import ReceptionDashboard from "../pages/receptionist/ReceptionDashboard";
import MechanicDashboard from "../pages/mechanic/MechanicDashboard";
import CustomerDashboard from "../pages/customer/CustomerDashboard";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/manager" element={<ManagerDashboard />} />
        <Route path="/reception" element={<ReceptionDashboard />} />
        <Route path="/mechanic" element={<MechanicDashboard />} />
        <Route path="/customer" element={<CustomerDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}