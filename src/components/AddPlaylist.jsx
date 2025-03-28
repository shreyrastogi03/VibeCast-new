import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddPlaylist = ({ loggedInUser }) => {
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [visibility, setVisibility] = useState("public"); // Default to public
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (!playlistTitle.trim()) {
      alert("Please enter a playlist title.");
      return;
    }

    if (!loggedInUser) {
      alert("You must be logged in to create a playlist.");
      return;
    }

    // Prepare the playlist data
    const newPlaylist = {
      title: playlistTitle.trim(),
      visibility,
      createdBy: loggedInUser, // Add the username of the logged-in user
    };

    try {
      // Send a POST request to add the playlist to db.json
      await axios.post("http://localhost:3000/playlists", newPlaylist);
      alert("Playlist created successfully!");

      // Reset the form and navigate back
      setPlaylistTitle("");
      setVisibility("public");
      navigate(-1); // Go back to the previous page
    } catch (error) {
      console.error("Error creating playlist:", error);
      alert("An error occurred while creating the playlist. Please try again.");
    }
  };

  const handleClose = () => {
    navigate(-1); // Navigate back to the previous page
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-800 text-white w-[400px] p-6 rounded-lg relative shadow-lg">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-xl"
          onClick={handleClose}
        >
          &times;
        </button>

        {/* Heading */}
        <h2 className="text-lg font-semibold mb-6">Add New Playlist</h2>

        {/* Input Field */}
        <input
          type="text"
          placeholder="Enter title"
          value={playlistTitle}
          onChange={(e) => setPlaylistTitle(e.target.value)}
          className="w-full px-4 py-2 mb-6 bg-gray-700 rounded-md text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        {/* Radio Buttons */}
        <div className="flex items-center space-x-6 mb-6">
          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="private"
              checked={visibility === "private"}
              onChange={(e) => setVisibility(e.target.value)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center ${
                visibility === "private" ? "bg-cyan-500" : "bg-transparent"
              }`}
            ></span>
            <span className="ml-2 text-sm">Set as private</span>
          </label>

          <label className="flex items-center">
            <input
              type="radio"
              name="visibility"
              value="public"
              checked={visibility === "public"}
              onChange={(e) => setVisibility(e.target.value)}
              className="hidden"
            />
            <span
              className={`w-5 h-5 rounded-full border-2 border-cyan-500 flex items-center justify-center ${
                visibility === "public" ? "bg-cyan-500" : "bg-transparent"
              }`}
            ></span>
            <span className="ml-2 text-sm">Set as public</span>
          </label>
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-cyan-500 text-black py-2 rounded-md font-semibold hover:bg-cyan-400"
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default AddPlaylist;
