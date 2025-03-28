import React, { useState, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaPlus,
  FaShareAlt,
  FaDownload,
  FaEllipsisV,
} from "react-icons/fa";
import axios from "axios";

const SongRow = ({ number, image, title, artist, views, audioUrl, loggedInUser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(new Audio(audioUrl)); // Create an Audio object

  const handlePlayClick = () => {
    if (isPlaying) {
      // Pause if already playing
      audioRef.current.pause();
    } else {
      // Play the audio
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleAddToFavorites = async () => {
    if (!loggedInUser) {
      alert("Please log in to add songs to your favorites.");
      return;
    }

    try {
      // Prepare the favorite data with the logged-in user's username
      const favoriteData = {
        username: loggedInUser,
        song: {
          title,
          artist,
          views,
          image,
          audioUrl,
        },
      };

      // Send a POST request to the "favourites" endpoint
      await axios.post("http://localhost:3000/favourites", favoriteData);
      alert(`"${title}" has been added to your favorites!`);
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add the song to favorites. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors rounded-lg px-4 py-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Song Number or Play Icon */}
      <div
        className="flex items-center justify-center w-[10%] cursor-pointer"
        onClick={handlePlayClick}
      >
        {isHovered || isPlaying ? (
          isPlaying ? (
            <FaPause className="text-gray-400 hover:text-white text-lg" />
          ) : (
            <FaPlay className="text-gray-400 hover:text-white text-lg" />
          )
        ) : (
          <span className="text-gray-400 text-sm">{number}</span>
        )}
      </div>

      {/* Song Image */}
      <div className="w-[10%] flex justify-center">
        <img
          src={image}
          alt={`Cover of ${title}`}
          className="w-12 h-12 object-cover rounded-md"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/150?text=No+Image";
          }}
        />
      </div>

      {/* Song Details */}
      <div className="flex flex-col w-[40%]">
        <h3 className="text-white font-semibold truncate">{title}</h3>
        <p className="text-gray-400 text-sm">{artist}</p>
      </div>

      {/* Song Views */}
      <div className="w-[20%] text-gray-400 text-sm text-center">
        <span>👁️ {views}</span>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-end space-x-4 w-[20%]">
        <button className="text-gray-400 hover:text-white" onClick={handleAddToFavorites}>
          <FaPlus />
        </button>
        <button className="text-gray-400 hover:text-white">
          <FaShareAlt />
        </button>
        <button className="text-gray-400 hover:text-white">
          <FaDownload />
        </button>
        <button className="text-gray-400 hover:text-white">
          <FaEllipsisV />
        </button>
      </div>
    </div>
  );
};

export default SongRow;
