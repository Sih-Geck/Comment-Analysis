import React, { useContext, useEffect, useState } from "react";
import { ConsultationContext } from "../context/ConsultationContext";
import { Link } from "react-router-dom";

export default function DeptHome() {
  const { consultations } = useContext(ConsultationContext);
  const [stats, setStats] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Dummy Stats (future backend se ayenge)
  const dummyStats = {
    totalComments: 1250,
    positive: 830,
    negative: 320,
  };

  useEffect(() => {
    setStats(dummyStats);
  }, []);

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = consultations.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(consultations.length / itemsPerPage);

  return (
    <div className="p-6">
      <h1 className="text-2xl bg-blue-500 rounded-lg text-yellow-200 h-15 flex justify-center items-center font-bold mb-6">
        Welcome Department
      </h1>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-10">
        {stats ? (
          <>
            <div className="bg-blue-200 p-4 rounded-lg text-center shadow">
              <h3 className="font-bold text-lg">{stats.totalComments}</h3>
              <p>Total Comments</p>
            </div>
            <div className="bg-green-200 p-4 rounded-lg text-center shadow">
              <h3 className="font-bold text-lg">{stats.positive}</h3>
              <p>Positive</p>
            </div>
            <div className="bg-red-200 p-4 rounded-lg text-center shadow">
              <h3 className="font-bold text-lg">{stats.negative}</h3>
              <p>Negative</p>
            </div>
          </>
        ) : (
          <p>Loading stats...</p>
        )}
      </div>

      {/* Recent Consultations */}
      <div className="bg-white shadow rounded-lg p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Recent Consultations</h2>

          {/* Rows per page selector */}
          <div className="flex items-center space-x-2">
            <label htmlFor="rows" className="text-sm">Rows per page:</label>
            <select
              id="rows"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border rounded px-2 py-1 text-sm"
            >
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={30}>30</option>
              <option value={40}>40</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        {currentItems.length > 0 ? (
          <>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="text-left border-b bg-gray-100">
                  <th className="p-2 w-1/6">Deadline</th>
                  <th className="p-2 w-2/6">Title</th>
                  <th className="p-2 w-1/6">File</th>
                  <th className="p-2 w-0/6">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b hover:bg-gray-50 transition cursor-pointer"
                  >
                    <td className="p-2 text-gray-600">{c.deadline}</td>
                    <td className="p-2">
                      <Link
                        to={`/department-dashboard/consultation/${c.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        {c.title}
                      </Link>
                    </td>
                    <td className="p-2">
                      {c.file ? (
                        <a
                          href={c.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 underline"
                        >
                          {c.file.name}
                        </a>
                      ) : (
                        "No File"
                      )}
                    </td>
                    <td className="p-2">
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          c.status === "open"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="flex justify-center items-center mt-4 space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-500">No consultations posted yet...</p>
        )}
      </div>
    </div>
  );
}
