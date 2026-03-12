import React, { useState } from "react";
import { FaCar, FaUserTie, FaTools, FaHeadset } from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";

function Login() {

    const [role, setRole] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (!role) {
            alert("Please select a role");
            return;
        }

        alert("Login as " + role);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">

            {/* Logo */}
            <div className="text-center mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mx-auto text-white text-2xl">
                    <FaCar />
                </div>

                <h1 className="text-2xl font-semibold mt-3">AutoCare</h1>
                <p className="text-gray-500 text-sm">
                    Vehicle Service Management System
                </p>
            </div>

            {/* Card */}
            <form
                onSubmit={handleLogin}
                className="bg-white shadow-lg rounded-2xl p-8 w-[420px]"
            >

                <h2 className="text-xl font-semibold text-center">
                    Welcome Back
                </h2>

                <p className="text-center text-gray-500 text-sm mb-6">
                    Enter your credentials to access your account
                </p>

                {/* Email */}
                <div className="mb-4">
                    <label className="text-sm font-medium">
                        Email or Username
                    </label>

                    <input
                        required
                        type="text"
                        placeholder="name@autocare.com"
                        className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="text-sm font-medium">Password</label>

                    <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full mt-2 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Roles */}

                <p className="text-xs text-gray-400 text-center mb-3">
                    SYSTEM ACCESS ROLES
                </p>

                <div className="grid grid-cols-4 gap-3 mb-4 text-xs">

                    <button
                        type="button"
                        onClick={() => setRole("Admin")}
                        className={`flex flex-col items-center p-2 rounded-lg border transition ${role === "Admin" ? "bg-blue-600 text-white" : "bg-gray-50"
                            }`}
                    >
                        <MdAdminPanelSettings size={20} />
                        <span className="mt-1">Admin</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => setRole("Manager")}
                        className={`flex flex-col items-center p-2 rounded-lg border transition ${role === "Manager" ? "bg-blue-600 text-white" : "bg-gray-50"
                            }`}
                    >
                        <FaUserTie size={20} />
                        <span className="mt-1">Manager</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setRole("Mechanic")}
                        className={`flex flex-col items-center p-2 rounded-lg border transition ${role === "Mechanic" ? "bg-blue-600 text-white" : "bg-gray-50"
                            }`}
                    >
                        <FaTools size={20} />
                        <span className="mt-1">Mechanic</span>
                    </button>


                    <button
                        type="button"
                        onClick={() => setRole("FrontDesk")}
                        className={`flex flex-col items-center p-2 rounded-lg border transition ${role === "FrontDesk" ? "bg-blue-600 text-white" : "bg-gray-50"
                            }`}
                    >
                        <FaHeadset size={20} />
                        <span className="mt-1">Front Desk</span>
                    </button>

                </div>

                {/* Login Button */}
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
                >
                    Sign In
                </button>

            </form>
        </div>
    );
}

export default Login;