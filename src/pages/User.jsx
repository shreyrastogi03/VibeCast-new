import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const User = () => {
  const [userData, setUserData] = useState(null); // State to hold the user's data
  const navigate = useNavigate();

  // Fetch logged-in user's data from db.json
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUsername = localStorage.getItem("loggedInUser");

        if (!loggedInUsername) {
          alert("You are not logged in. Redirecting to login page...");
          navigate("/login");
          return;
        }

        const response = await axios.get("http://localhost:3000/users");
        const user = response.data.find(
          (user) => user.username === loggedInUsername
        );

        if (user) {
          setUserData(user);
        } else {
          alert("User not found. Redirecting to login page...");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert("Error fetching user data. Please try again later.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleEdit = () => {
    navigate("/editprofile");
  };

  const handleDeleteAccount = async () => {
    try {
      if (!userData || !userData.id) {
        alert("Error: Unable to delete account. User ID not found.");
        return;
      }

      // Confirm the deletion
      if (!window.confirm("Are you sure you want to delete your account?")) {
        return;
      }

      // Delete the user's account from the database
      await axios.delete(`http://localhost:3000/users/${userData.id}`);

      // Clear the logged-in user from localStorage and redirect to login
      localStorage.removeItem("loggedInUser");
      alert("Your account has been deleted.");
      
      navigate("/");
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("Failed to delete account. Please try again.");
    }
  };

  // If userData is not yet loaded, show a loading indicator
  if (!userData) {
    return (
      <div className="bg-gray-900 text-white min-h-screen flex justify-center items-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen ml-[240px] p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-gray-400 mb-6">
        <button
          onClick={() => window.history.back()}
          className="text-xl mr-2 focus:outline-none"
        >
          ←
        </button>
        <span>Home / {userData.username}</span>
      </div>

      {/* Profile Card */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md flex items-center justify-between">
        {/* Left Section: Profile Details */}
        <div className="flex items-center">
          <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center text-gray-400 mr-6">
            <span className="text-3xl">👤</span>
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-2xl font-bold">{userData.username}</h2>
            <div className="text-sm text-gray-400 mt-2">
              <p>
                <span className="text-gray-300 font-semibold">Name: </span>
                {userData.username}
              </p>
              <p>
                <span className="text-gray-300 font-semibold">Birthday: </span>
                {userData.birthday || "Not set"}
              </p>
              <p>
                <span className="text-gray-300 font-semibold">
                  Description:{" "}
                </span>
                {userData.description || "No description"}
              </p>
              <p>
                <span className="text-gray-300 font-semibold">Gender: </span>
                {userData.gender || "Not specified"}
              </p>
              <p>
                <span className="text-gray-300 font-semibold">Country: </span>
                {userData.country || "Not specified"}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={handleEdit}
            className="bg-cyan-500 text-black px-4 py-2 rounded-md hover:bg-cyan-400 transition"
          >
            Edit
          </button>
          <button
            onClick={handleDeleteAccount}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-400 transition"
          >
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default User;
