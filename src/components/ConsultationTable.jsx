import React from "react";

export default function ConsultationTable({ data }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 border">#</th>
            <th className="px-4 py-2 border">Title</th>
            <th className="px-4 py-2 border">Description</th>
            <th className="px-4 py-2 border">Deadline</th>
            <th className="px-4 py-2 border">Posted By</th>
            <th className="px-4 py-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((c, index) => (
              <tr key={c.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border font-medium">{c.title}</td>
                <td className="px-4 py-2 border">{c.description}</td>
                <td className="px-4 py-2 border text-sm">{c.deadline}</td>
                <td className="px-4 py-2 border text-sm">{c.postedBy || "Officer"}</td>
                <td className="px-4 py-2 border">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      c.status === "open"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {c.status || "open"}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="6"
                className="px-4 py-4 border text-center text-gray-500"
              >
                No consultations posted yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
