import React, { useState, useEffect } from "react";
import api from "/Users/shreyrastogi/vibecastclone/api.js"; // Axios instance

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "" });

  // Fetch all users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Create a new user
  const createUser = async () => {
    try {
      const response = await api.post("/users", newUser);
      setUsers([...users, response.data]); // Update state with new user
      setNewUser({ name: "", email: "" }); // Reset form
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  // Delete a user
  const deleteUser = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id)); // Update state
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {/* Create User Form */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Add New User</h2>
        <input
          type="text"
          placeholder="Name"
          value={newUser.name}
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <input
          type="email"
          placeholder="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={createUser}
          className="p-2 bg-blue-500 text-white rounded"
        >
          Add User
        </button>
      </div>

      {/* User List */}
      <div>
        <h2 className="text-lg font-semibold mb-2">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              className="p-2 border-b flex justify-between items-center"
            >
              <span>
                {user.name} ({user.email})
              </span>
              <button
                onClick={() => deleteUser(user.id)}
                className="p-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
