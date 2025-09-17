import React, { useState } from "react";

export default function DepartmentLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Fixed credentials (frontend check ke liye)
  const DEPT_USERNAME = "deptuser";
  const DEPT_PASSWORD = "dept@123";

  const handleSubmit = (e) => {
    e.preventDefault();

    if (username === DEPT_USERNAME && password === DEPT_PASSWORD) {
      // ✅ Local aur GitHub Pages dono handle karega
      const base =
        import.meta.env.MODE === "development" ? "/" : "/Comment-Analysis/"; // <-- apna repo name

      window.open(`${base}department-dashboard`, "_blank");
    } else {
      setError("Invalid Department Credentials");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6 text-gray-800">
          Department Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter department username"
              className="w-full px-3 py-2 border rounded text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2 text-sm sm:text-base">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter department password"
              className="w-full px-3 py-2 border rounded text-sm sm:text-base focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded text-sm sm:text-base hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
