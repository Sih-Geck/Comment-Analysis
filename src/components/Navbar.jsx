import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Asset from "../assets/Emblem.jpg";

// SVG Icons
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About MCA", path: "/dashboard" },
    { name: "Acts & Rules", path: "/admin" },
    { name: "My Workspace", path: "/admin" },
    { name: "My Application", path: "/admin" },
    { name: "MCA Services", path: "/admin" },
    { name: "E-Consultation", path: "/E-Consultation"},
    { name: "Data & Reports", path: "/admin" },
    { name: "Help & FAQs", path: "/admin" },
    { name: "Contact Us", path: "/admin" },
  ];

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 ">
      {/* Top Bar */}
      <div className="bg-blue-950  text-white h-15 flex items-center">
        <div className="container mx-auto px-5 py-1.5 flex justify-between items-center text-xs">
          <span> eConsultation Portal</span>
          <div className="hidden sm:flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span>Font Size</span>
              <button className="h-5 w-5 bg-gray-700 rounded-sm flex items-center justify-center text-white">
                -
              </button>
              <button className="h-5 w-5 bg-gray-700 rounded-sm flex items-center justify-center text-white">
                A
              </button>
              <button className="h-5 w-5 bg-gray-700 rounded-sm flex items-center justify-center text-white">
                +
              </button>
            </div>
            <div className="h-4 w-px bg-gray-500"></div>
            <Link
              to="/login"
              className="flex items-center gap-1.5 hover:underline"
            >
              <UserIcon />
              <span>Sign In / Sign Up</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="bg-white py-4 px-4 shadow-sm h-30 flex items-center">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-baseline gap-4">
          <Link to="/" className="flex items-center gap-1">
            <img src={Asset} alt="Emblem" className="h-22 w-auto ml-20" />
          </Link>
          <div className="hidden md:block h-17 w-0.5 bg-gray-300 ml-15"></div>
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <p className="text-sm font-semibold text-gray-600">
              EMPOWERING BUSINESS, PROTECTING INVESTORS
            </p>
            <div>
              <span className="text-sm font-bold text-orange-500">
                REGULATOR
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-sm font-bold text-green-500">
                INTEGRATOR
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-sm font-bold text-red-500">
                FACILITATOR
              </span>
              <span className="text-gray-400 mx-1">•</span>
              <span className="text-sm font-bold text-blue-500">EDUCATOR</span>
            </div>
          </div>
          <div className="relative w-full md:w-auto ml-70">
            <input
              type="search"
              placeholder="Search"
              className="bg-gray-100 rounded-full py-2 pl-4 pr-10 w-full md:w-130 border-2 border-transparent focus:border-brand-blue-500 focus:outline-none transition"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <SearchIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav className="bg-blue-950">
        <div className="container mx-auto px-4 flex justify-between items-center h-12">
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center h-full flex-1">
            <ul className="flex space-x-2 w-full">
              {navLinks.map((link) => (
                <li key={link.name} className="flex-1 text-center">
                  {link.external ? (
                    <a
                      href={link.path}
                      
                      rel="noopener noreferrer"
                      className="w-full text-center text-white h-full flex items-center justify-center text-sm font-medium transition-colors hover:bg-brand-blue-800"
                    >
                      {link.name}
                    </a>
                  ) : (
                   <NavLink
  to={link.path}
  className={({ isActive }) =>
    `relative w-auto px-3 py-2 text-sm font-medium transition-all 
     ${isActive 
       ? "bg-blue-800 text-white rounded-md" 
       : "text-white hover:bg-blue-700 hover:rounded-md"}`
  }
>
  {link.name}
</NavLink>



                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-brand-blue-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    !isOpen ? "M4 6h16M4 12h16M4 18h16" : "M6 18L18 6M6 6l12 12"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <ul>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-3 py-2 rounded-md text-white hover:bg-brand-blue-800"
                      >
                        {link.name}
                      </a>
                    ) : (
                      <NavLink
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="block px-3 py-2 rounded-md text-white hover:bg-brand-blue-800"
                      >
                        {link.name}
                      </NavLink>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
