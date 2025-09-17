import React from "react";

export default function ConsultationTable({ data }) {
  return (
    <div className="overflow-x-auto">
      {/* Desktop Table */}
      <table className="hidden md:table min-w-full border border-gray-300 bg-white shadow-md rounded-lg">
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

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {data.length > 0 ? (
          data.map((c, index) => (
            <div
              key={c.id}
              className="bg-white shadow rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-gray-600">
                  #{index + 1}
                </span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    c.status === "open"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {c.status || "open"}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-800 mb-1">{c.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{c.description}</p>
              <div className="text-xs text-gray-500">
                <p>
                  <span className="font-medium">Deadline:</span> {c.deadline}
                </p>
                <p>
                  <span className="font-medium">Posted By:</span>{" "}
                  {c.postedBy || "Officer"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            No consultations posted yet.
          </p>
        )}
      </div>
    </div>
  );
}
