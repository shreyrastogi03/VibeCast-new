import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginSignup = ({ setLoggedInUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    username: "",
    gender: "Male",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      // Login logic
      try {
        const { email, phone, password } = formData;
        const response = await axios.get("http://localhost:3000/users");
        const users = response.data;

        const user = users.find(
          (user) =>
            (user.email === email || user.phone === phone) &&
            user.password === password
        );

        if (user) {
          setLoggedInUser(user.username); // Update app state
          localStorage.setItem("loggedInUser", user.username); // Persist to localStorage
          navigate("/"); // Redirect to the home page
        } else {
          alert("Invalid email/phone or password.");
        }
      } catch (error) {
        console.error("Error logging in:", error);
        alert("Error logging in. Please try again.");
      }
    } else {
      // Signup logic
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      try {
        // Create a new user in the JSON server
        await axios.post("http://localhost:3000/users", {
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          username: formData.username,
          gender: formData.gender,
        });

        // Log the user in after signing up
        setLoggedInUser(formData.username); // Update app state
        localStorage.setItem("loggedInUser", formData.username); // Persist to localStorage

        navigate("/"); // Redirect to the home page
      } catch (error) {
        console.error("Error signing up:", error);
        alert("Error signing up. Please try again.");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white w-[400px] p-6 rounded-lg relative">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={() => navigate('/')}
        >
          &times;

        </button>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-6">
          <button
            className={`text-lg font-semibold ${
              isLogin ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Log in
          </button>
          <button
            className={`text-lg font-semibold ${
              !isLogin ? "text-white" : "text-gray-500"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign up
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email or Phone */}
          {isLogin ? (
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Your Email or Phone"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          ) : (
            <>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Your Email Address"
                className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                required
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Your Phone Number"
                className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </>
          )}

          {/* Username */}
          {!isLogin && (
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              placeholder="User Name"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          )}

          {/* Password */}
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Password (6-16 characters)"
            className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
            required
          />

          {/* Confirm Password */}
          {!isLogin && (
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
              className="w-full px-4 py-2 bg-gray-700 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              required
            />
          )}

          {/* Submit Button */}
          <button className="w-full bg-cyan-500 text-black py-2 rounded-md font-semibold mt-4 hover:bg-cyan-400">
            {isLogin ? "Log in" : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginSignup;
