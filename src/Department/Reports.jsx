import React from "react";

export default function Reports() {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>
      <p className="text-gray-700 mb-4">
        Generate and view reports for department activities.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer">
          📊 User Activity Report
        </div>
        <div className="p-4 border rounded shadow hover:bg-gray-50 cursor-pointer">
          📑 Consultation Summary
        </div>
      </div>
    </div>
  );
}
