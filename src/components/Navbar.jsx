import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/new.png";

const Navbar = ({ loggedInUser, onLogout }) => {
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search input
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      navigate(`/search?query=${searchQuery}`);
      setSearchQuery(""); // Clear input after searching
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-md z-50 h-16 flex items-center px-6">
      {/* Left Section: Logo */}
      <div className="flex items-center space-x-4">
        <img src={logo} alt="Vibecast Logo" className="h-10 w-auto" />
        <span className="text-xl font-bold">Vibecast</span>
      </div>

      {/* Middle Section: Search Bar */}
      <div className="flex-grow mx-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search for songs..."
          className="w-full px-4 py-2 bg-gray-800 rounded-full text-sm text-gray-300 placeholder-gray-500 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Right Section: User Info */}
      <div className="flex items-center space-x-6">
        {loggedInUser ? (
          <>
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/user")}
            >
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-400 text-lg">👤</span>
              </div>
              <span className="text-sm text-gray-300">{loggedInUser}</span>
            </div>
            <button
              onClick={() => {
                onLogout();
                navigate("/");
              }}
              className="bg-red-500 text-white px-3 py-1 rounded-full hover:bg-red-400 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <a
            href="/login"
            className="bg-blue-500 text-white px-4 py-1 rounded-full hover:bg-blue-400 transition"
          >
            Log in / Sign up
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
