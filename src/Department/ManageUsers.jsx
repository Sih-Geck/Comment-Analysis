import React from "react";

export default function ManageUsers() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <p className="text-gray-700 mb-4">
        Here you can add, remove, or update department users.
      </p>

      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border px-4 py-2">1</td>
            <td className="border px-4 py-2">John Doe</td>
            <td className="border px-4 py-2">Reviewer</td>
            <td className="border px-4 py-2">
              <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Edit
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
