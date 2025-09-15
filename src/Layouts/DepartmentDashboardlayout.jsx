import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import { FaUsers, FaFileAlt, FaChartBar, FaSignOutAlt, FaHome } from "react-icons/fa";

export default function DepartmentDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-blue-700">
          Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-3">
          <NavLink
            to="/department-dashboard"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition ${
                isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
              }`
            }
          >
            <FaHome /> Home
          </NavLink>

          <NavLink
            to="/department-dashboard/users"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition ${
                isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
              }`
            }
          >
            <FaUsers /> Manage Users
          </NavLink>

          <NavLink
            to="/department-dashboard/consultations"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition ${
                isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
              }`
            }
          >
            <FaFileAlt /> Consultations
          </NavLink>

          <NavLink
            to="/department-dashboard/reports"
            className={({ isActive }) =>
              `flex items-center gap-2 p-2 rounded transition ${
                isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
              }`
            }
          >
            <FaChartBar /> Reports
          </NavLink>
        </nav>

        <div className="p-4 border-t border-blue-700">
          <button className="flex items-center gap-2 w-full justify-center bg-red-600 py-2 rounded hover:bg-red-700">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content (changes per section) */}
      <div className="flex-1 p-8">
        <Outlet /> {/* Ye jagah route ke hisaab se change hogi */}
      </div>
    </div>
  );
}
