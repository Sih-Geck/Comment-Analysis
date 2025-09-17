import React from "react";

export default function ManageUsers() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p className="text-gray-700 mb-4">
        Here you can add, remove, or update department users.
      </p>

      {/* Responsive Table Wrapper */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2 hidden sm:table-cell">Role</th>
              <th className="border px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="border px-4 py-2">1</td>
              <td className="border px-4 py-2">John Doe</td>
              <td className="border px-4 py-2 hidden sm:table-cell">Reviewer</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs sm:text-sm">
                  Edit
                </button>
              </td>
            </tr>
            <tr className="hover:bg-gray-50">
              <td className="border px-4 py-2">2</td>
              <td className="border px-4 py-2">Jane Smith</td>
              <td className="border px-4 py-2 hidden sm:table-cell">Admin</td>
              <td className="border px-4 py-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-xs sm:text-sm">
                  Edit
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
