import React, { useEffect, useState } from "react";
import SongRow from "../components/SongRow";

const Trending = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch songs from JSON Server
  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await fetch("http://localhost:3000/TopSongs");
        if (!response.ok) {
          throw new Error("Failed to fetch songs");
        }
        const data = await response.json();
        setSongs(data);
      } catch (error) {
        console.error("Error fetching songs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSongs();
  }, []);

  if (loading) {
    return (
      <div className="ml-[240px] pt-[4rem] text-white text-center bg-gray-900 min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="ml-[240px] pt-[4rem] bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Content Wrapper */}
      <div className="flex-grow p-6">
        {/* Heading */}
        <div className="max-w-6xl mx-auto mb-6">
          <h1 className="text-2xl font-bold">Latest Songs</h1>
          <p className="text-gray-400">Discover the latest hits.</p>
        </div>

        {/* Song List */}
        <div className="max-w-6xl mx-auto space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {songs.map((song, index) => (
            <SongRow
              key={song.id}
              number={index + 1}
              title={song.title}
              artist={song.artist}
              views={song.views}
              image={song.imageUrl}
              audioUrl={song.audioUrl}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-6xl mx-auto px-6 py-4 text-center">
          <p className="text-sm">&copy; 2023 Vibecast. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Trending;
