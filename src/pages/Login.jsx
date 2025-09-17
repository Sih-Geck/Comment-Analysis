import React from "react";
import { Link } from "react-router-dom";
import Image from "../assets/Sequrity.png"; // image

export default function LoginPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Left Section (Image Banner) */}
        <div className="w-full md:w-1/2 bg-blue-900 flex items-center justify-center">
          <img
            src={Image}
            alt="Login Banner"
            className="object-cover w-full h-48 md:h-full"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Login to Your Account
          </h2>

          {/* Form */}
          <form>
            {/* Username */}
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Password */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded mb-3 hover:bg-blue-700 transition"
            >
              Login
            </button>
          </form>

          {/* Register Button */}
          <Link
            to="/signup"
            className="block w-full text-center border border-blue-600 text-blue-600 py-2 rounded mb-3 hover:bg-blue-50 transition"
          >
            Register
          </Link>

          {/* Departmental Login Button */}
          <Link
            to="/Department-logins"
            className="block w-full text-center border border-green-600 text-green-600 py-2 rounded hover:bg-green-50 transition"
          >
            Departmental Login
          </Link>
        </div>
      </div>
    </div>
  );
}
