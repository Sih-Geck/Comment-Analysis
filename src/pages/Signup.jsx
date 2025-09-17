import { useNavigate } from "react-router-dom";
import Image from "../assets/Sequrity.png"; // image

export default function Signup() {
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup clicked");
    // Signup logic yaha likh sakte ho (API call etc.)
    navigate("/login"); // Signup ke baad login page par redirect
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-6xl shadow-lg rounded-lg overflow-hidden bg-white">
        
        {/* Left Section (Banner) */}
        <div className="w-full md:w-1/2 bg-blue-900 flex items-center justify-center">
          <img
            src={Image}
            alt="Signup Banner"
            className="object-cover w-full h-48 md:h-full"
          />
        </div>

        {/* Right Section (Form) */}
        <div className="w-full md:w-1/2 p-6 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
            Create Your Account
          </h2>

          <form onSubmit={handleSignup} className="space-y-4">
            <input
              type="text"
              placeholder="Company Name"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="text"
              placeholder="CIN Number"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />

            {/* Buttons */}
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700 transition"
            >
              Sign Up
            </button>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="w-full border border-blue-600 text-blue-600 py-2 rounded font-semibold hover:bg-blue-700 hover:text-white transition"
            >
              Back to Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
