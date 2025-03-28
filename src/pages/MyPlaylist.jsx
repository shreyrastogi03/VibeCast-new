import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MyPlaylist = () => {
  const [playlists, setPlaylists] = useState([]); // Assuming playlists will be fetched or managed here.
  const navigate = useNavigate();

  const handleAddPlaylist = () => {
    // Navigate to the AddPlaylist page or open a modal.
    navigate("/addplaylist");
  };

  return (
    <div className="ml-[240px] pt-16 bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center">
      {playlists.length === 0 ? (
        <div className="flex flex-col items-center">
          {/* Placeholder Image */}
          <img
            src="/path-to-placeholder-image.svg" // Replace this with the actual path to the placeholder image
            alt="No Playlists"
            className="mb-6 w-24 h-24"
          />

          {/* Text */}
          <p className="text-gray-400 text-center mb-4">
            You haven't created any playlists. Create your own playlists here.
          </p>

          {/* Add Playlist Button */}
          <button
            onClick={handleAddPlaylist}
            className="bg-cyan-500 text-black py-2 px-6 rounded-md font-semibold hover:bg-cyan-400"
          >
            Add Playlist
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="bg-gray-800 p-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <img
                src={playlist.imageUrl} // Replace with actual playlist image
                alt={playlist.title}
                className="w-full h-32 object-cover rounded-md mb-4"
              />
              <h3 className="text-lg font-semibold">{playlist.title}</h3>
              <p className="text-gray-400 text-sm">{playlist.visibility}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyPlaylist;
