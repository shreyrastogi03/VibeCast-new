import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id: "", // Add the id field
    username: "",
    name: "",
    gender: "Male",
    birthdayYear: "",
    birthdayMonth: "",
    birthdayDay: "",
    country: "",
    description: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      const loggedInUsername = localStorage.getItem("loggedInUser");
      if (!loggedInUsername) {
        alert("You are not logged in. Redirecting to login page...");
        navigate("/login");
        return;
      }

      try {
        const response = await axios.get("http://localhost:3000/users");
        const user = response.data.find((u) => u.username === loggedInUsername);

        if (user) {
          const [year, month, day] = user.birthday
            ? user.birthday.split("-")
            : ["", "", ""];
          setFormData({
            id: user.id, // Save the user's ID
            username: user.username,
            name: user.username,
            gender: user.gender || "Male",
            birthdayYear: year,
            birthdayMonth: month,
            birthdayDay: day,
            country: user.country || "",
            description: user.description || "",
          });
        } else {
          alert("User not found. Redirecting to login...");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = async () => {
    try {
      const {
        id,
        username,
        name,
        gender,
        birthdayYear,
        birthdayMonth,
        birthdayDay,
        country,
        description,
      } = formData;

      if (!id) {
        alert("Error: User ID is missing.");
        return;
      }

      const birthday = `${birthdayYear}-${birthdayMonth}-${birthdayDay}`;
      await axios.patch(`http://localhost:3000/users/${id}`, {
        name,
        gender,
        birthday,
        country,
        description,
      });
      alert("Profile updated successfully!");
      navigate("/user");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    navigate("/user");
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen ml-[240px] p-6">
      <h1 className="text-2xl font-bold mb-6">Edit Profile</h1>
      <form className="space-y-6">
        {/* Username (readonly) */}
        <div>
          <label className="block text-gray-400 mb-2">User name:</label>
          <input
            type="text"
            value={formData.username}
            readOnly
            className="w-full px-4 py-2 bg-gray-800 text-gray-500 rounded-md"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block text-gray-400 mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block text-gray-400 mb-2">Gender:</label>
          <div className="flex space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={formData.gender === "Male"}
                onChange={handleInputChange}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center ${
                  formData.gender === "Male" ? "bg-cyan-500" : "bg-transparent"
                }`}
              ></span>
              <span className="ml-2 text-gray-300">Male</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={formData.gender === "Female"}
                onChange={handleInputChange}
                className="hidden"
              />
              <span
                className={`w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center ${
                  formData.gender === "Female" ? "bg-cyan-500" : "bg-transparent"
                }`}
              ></span>
              <span className="ml-2 text-gray-300">Female</span>
            </label>
          </div>
        </div>

        {/* Birthday */}
        <div>
          <label className="block text-gray-400 mb-2">Birthday:</label>
          <div className="flex space-x-4">
            <input
              type="text"
              name="birthdayYear"
              value={formData.birthdayYear}
              onChange={handleInputChange}
              placeholder="Year"
              className="w-1/3 px-4 py-2 bg-gray-800 rounded-md"
            />
            <input
              type="text"
              name="birthdayMonth"
              value={formData.birthdayMonth}
              onChange={handleInputChange}
              placeholder="Month"
              className="w-1/3 px-4 py-2 bg-gray-800 rounded-md"
            />
            <input
              type="text"
              name="birthdayDay"
              value={formData.birthdayDay}
              onChange={handleInputChange}
              placeholder="Day"
              className="w-1/3 px-4 py-2 bg-gray-800 rounded-md"
            />
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="block text-gray-400 mb-2">Country:</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-800 rounded-md"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-400 mb-2">Description:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 bg-gray-800 rounded-md"
          ></textarea>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={handleSave}
            className="bg-cyan-500 text-black px-4 py-2 rounded-md hover:bg-cyan-400 transition"
          >
            Done
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-700 text-gray-300 px-4 py-2 rounded-md hover:bg-gray-600 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
