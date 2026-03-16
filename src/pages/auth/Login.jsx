import React, { useState } from "react";
import { FaCar, FaUserTie, FaTools, FaHeadset } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Login() {
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!role) {
      alert("Please select a role");
      return;
    }

    // ── Role Based Navigation ──
    if (role === "Admin")     navigate("/admin/dashboard");
    if (role === "Manager")   navigate("/manager/dashboard");
    if (role === "Mechanic")  navigate("/mechanic/dashboard");
    if (role === "FrontDesk") navigate("/receptionist/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

      {/* Logo */}
      <div className="text-center mb-6">
        <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto text-white text-2xl">
          <FaCar />
        </div>
        <h1 className="text-2xl font-semibold mt-3">AutoCare</h1>
        <p className="text-gray-500 text-sm">Vehicle Service Management System</p>
      </div>

      {/* Login Card */}
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-2xl p-8 w-[420px]"
      >
        <h2 className="text-xl font-semibold text-center">Welcome Back</h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Enter your credentials to access your account
        </p>

        {/* Email */}
        <div className="mb-4">
          <label className="text-sm font-medium">Email or Username</label>
          <input
            required
            type="text"
            placeholder="name@autocare.com"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="text-sm font-medium">Password</label>
          <input
            required
            type="password"
            placeholder="••••••••"
            className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        {/* Role Selection */}
        <p className="text-xs text-gray-400 text-center mb-3">
          SYSTEM ACCESS ROLES
        </p>

        <div className="grid grid-cols-4 gap-3 mb-6 text-xs">
          {[
            { label: "Admin",      value: "Admin",     icon: <MdAdminPanelSettings size={20} /> },
            { label: "Manager",    value: "Manager",   icon: <FaUserTie size={20} /> },
            { label: "Mechanic",   value: "Mechanic",  icon: <FaTools size={20} /> },
            { label: "Front Desk", value: "FrontDesk", icon: <FaHeadset size={20} /> },
          ].map(({ label, value, icon }) => (
            <button
              key={value}
              type="button"
              onClick={() => setRole(value)}
              className={`flex flex-col items-center p-3 rounded-xl border-2 transition-all ${
                role === value
                  ? "bg-blue-600 text-white border-blue-600"
                  : "bg-gray-50 text-gray-600 border-gray-200 hover:border-blue-300"
              }`}
            >
              {icon}
              <span className="mt-1 font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Selected Role */}
        {role && (
          <div className="mb-4 text-center bg-blue-50 border border-blue-100 rounded-xl py-2">
            <span className="text-xs text-blue-600 font-semibold">
              Role Selected: {role}
            </span>
          </div>
        )}

        {/* Login Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 font-semibold transition-colors"
        >
          Sign In →
        </button>

      </form>
    </div>
  );
}

export default Login;