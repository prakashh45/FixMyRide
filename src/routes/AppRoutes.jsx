import { Routes, Route } from "react-router-dom";

// ── Auth ──
import Login from "../pages/auth/Login";

// ── Admin ──
import AdminDashboard  from "../pages/admin/Dashboard";
import Customer        from "../pages/admin/Customer";
import Vehicles        from "../pages/admin/Vehicles";
import Mechanics       from "../pages/admin/Mechanics";
import Reports         from "../pages/admin/Reports";
import Inventory       from "../pages/admin/Inventory";
import JobCards        from "../pages/admin/JobCards";

import Settings        from "../pages/admin/Settings";
import Profile         from "../pages/admin/Profile";

// ── Mechanic ──
import MechanicDashboard from "../pages/mechanic/Dashboard";
import AssignedJobs      from "../pages/mechanic/AssignedJobs";
import StatusUpdates     from "../pages/mechanic/StatusUpdates";
import CompletedJobs     from "../pages/mechanic/CompletedJobs";
import Notifications     from "../pages/mechanic/Notifications";
import MechanicProfile   from "../pages/mechanic/Profile";
import ServiceRequests from "../pages/admin/Servicerequests";

function AppRoutes() {
  return (
    <Routes>

      {/* ── Auth ── */}
      <Route path="/" element={<Login />} />

      {/* ── Admin ── */}
      <Route path="/admin/dashboard"        element={<AdminDashboard />} />
      <Route path="/admin/customers"        element={<Customer />} />
      <Route path="/admin/vehicles"         element={<Vehicles />} />
      <Route path="/admin/mechanics"        element={<Mechanics />} />
      <Route path="/admin/reports"          element={<Reports />} />
      <Route path="/admin/inventory"        element={<Inventory />} />
      <Route path="/admin/job-cards"        element={<JobCards />} />
      <Route path="/admin/service-requests" element={<ServiceRequests />} />
      <Route path="/admin/settings"         element={<Settings />} />
      <Route path="/admin/profile"          element={<Profile />} />

      {/* ── Mechanic ── */}
      <Route path="/mechanic/dashboard"      element={<MechanicDashboard />} />
      <Route path="/mechanic/assigned-jobs"  element={<AssignedJobs />} />
      <Route path="/mechanic/status-updates" element={<StatusUpdates />} />
      <Route path="/mechanic/completed-jobs" element={<CompletedJobs />} />
      <Route path="/mechanic/notifications"  element={<Notifications />} />
      <Route path="/mechanic/profile"        element={<MechanicProfile />} />

    </Routes>
  );
}

export default AppRoutes;