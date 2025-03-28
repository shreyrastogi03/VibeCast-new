import React, { useEffect, useState } from "react";
import axios from "axios";

const Favourites = () => {
  const [favourites, setFavourites] = useState([]);

  // Fetch favourite songs from db.json
  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const response = await axios.get("http://localhost:3000/favourites");
        setFavourites(response.data); // Set fetched favourites
      } catch (error) {
        console.error("Error fetching favourites:", error);
      }
    };

    fetchFavourites();
  }, []);

  return (
    <div className="ml-[240px] pt-[4rem] bg-gray-900 text-white min-h-screen flex flex-col">
      <div className="p-6">
        <div className="flex justify-start space-x-6 mb-8">
          <button
            className="text-lg font-semibold text-cyan-500 border-b-2 border-cyan-500"
          >
            Songs
          </button>
          <button className="text-lg font-semibold text-gray-500 hover:text-cyan-500">
            Albums
          </button>
          <button className="text-lg font-semibold text-gray-500 hover:text-cyan-500">
            Playlists
          </button>
          <button className="text-lg font-semibold text-gray-500 hover:text-cyan-500">
            Artists
          </button>
        </div>

        {/* Check if favourites are empty */}
        {favourites.length === 0 ? (
          <div className="flex flex-col items-center justify-center mt-20 text-center">
            <img
              src="https://via.placeholder.com/100?text=🎵" // Replace with the actual image URL for the placeholder
              alt="No Favourites"
              className="mb-6 w-20 h-20"
            />
            <p className="text-gray-400 text-lg mb-4">
              No songs in your favourites. Go and find more music on VibeCast.
            </p>
            <button className="bg-cyan-500 text-black px-6 py-2 rounded-md font-semibold hover:bg-cyan-400">
              Discover more music
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {favourites.map((song) => (
              <div
                key={song.id}
                className="bg-gray-800 rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <img
                  src={song.imageUrl}
                  alt={song.title}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg font-semibold text-center">{song.title}</h3>
                <p className="text-gray-400 text-sm text-center">{song.artist}</p>
                <p className="text-gray-400 text-sm text-center">{song.views} views</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
