import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  FaUsers,
  FaFileAlt,
  FaChartBar,
  FaSignOutAlt,
  FaHome,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function DepartmentDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar (Mobile drawer + Desktop fixed) */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-blue-900 text-white transform transition-transform duration-200 md:relative md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header for Desktop */}
          <div className="hidden md:block p-4 text-xl font-bold border-b border-blue-700">
            Dashboard
          </div>

          {/* Sidebar Header for Mobile */}
          <div className="md:hidden flex justify-between items-center px-4 py-3 border-b border-blue-700">
            <span className="font-bold">Dashboard</span>
            <button onClick={() => setSidebarOpen(false)}>
              <FaTimes />
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
            <NavLink
              to="/department-dashboard"
              end
              className={({ isActive }) =>
                `flex items-center gap-2 p-2 rounded transition ${
                  isActive ? "bg-blue-700 font-semibold" : "hover:bg-blue-700"
                }`
              }
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
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
              onClick={() => setSidebarOpen(false)}
            >
              <FaChartBar /> Reports
            </NavLink>
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-blue-700">
            <button className="flex items-center gap-2 w-full justify-center bg-red-600 py-2 rounded hover:bg-red-700">
              <FaSignOutAlt /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        {/* Topbar for Mobile */}
        <div className="md:hidden flex justify-between items-center">
          <button onClick={() => setSidebarOpen(true)}>
            <FaBars size={22} />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden md:flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Welcome Department</h1>
        </div>

        <Outlet />
      </main>
    </div>
  );
}
