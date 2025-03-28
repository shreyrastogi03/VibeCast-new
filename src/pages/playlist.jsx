import React, { useState, useEffect } from "react";
import Card from "../components/card"; // Ensure the path is correct.

const Playlist = () => {
  const [filters, setFilters] = useState({
    moods: "All",
    vibes: "All",
    time: "All",
    holiday: "All",
    genre: "All",
  });

  const [playlists, setPlaylists] = useState([]);
  const [filteredPlaylists, setFilteredPlaylists] = useState([]);

  // Fetch playlists from db.json
  useEffect(() => {
    fetch("http://localhost:3000/playlist")
      .then((response) => response.json())
      .then((data) => {
        console.log("Fetched playlists:", data); // Debugging log
        setPlaylists(data);
        setFilteredPlaylists(data); // Initially show all playlists
      })
      .catch((error) => console.error("Error fetching playlists:", error));
  }, []);

  const filterOptions = {
    moods: ["All", "Happy", "Relax", "Motivation", "Mapenzi", "Furaha", "Sad"],
    vibes: [
      "All",
      "Party",
      "Workout",
      "Study&Work",
      "Wedding",
      "Sleep",
      "Driving",
      "Yoga",
      "Trip",
      "Dance",
      "Games",
    ],
    time: ["All", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    holiday: [
      "All",
      "Father's Day",
      "Halloween",
      "Mother's Day",
      "International Women's Day",
      "Christmas",
      "Easter",
      "New Year's Day",
      "Eid",
    ],
    genre: ["All", "Pop", "Rock", "Country", "Blues", "Jazz", "Reggae"],
  };

  const handleFilterChange = (category, value) => {
    setFilters((prev) => ({ ...prev, [category]: value }));
  };

  // Update filtered playlists whenever filters or playlists change
  useEffect(() => {
    let filtered = playlists;

    // Apply filters only if they are not "All"
    if (filters.genre !== "All") {
      filtered = filtered.filter((playlist) => playlist.genre === filters.genre);
    }

    if (filters.moods !== "All") {
      filtered = filtered.filter((playlist) => playlist.moods?.includes(filters.moods));
    }

    if (filters.vibes !== "All") {
      filtered = filtered.filter((playlist) => playlist.vibes?.includes(filters.vibes));
    }

    if (filters.time !== "All") {
      filtered = filtered.filter((playlist) => playlist.time?.includes(filters.time));
    }

    if (filters.holiday !== "All") {
      filtered = filtered.filter((playlist) => playlist.holiday?.includes(filters.holiday));
    }

    console.log("Filtered playlists:", filtered); // Debugging log
    setFilteredPlaylists(filtered);
  }, [filters, playlists]);

  const renderFilterButtons = (category) =>
    filterOptions[category].map((option) => (
      <button
        key={option}
        className={`px-3 py-1 rounded-full ${
          filters[category] === option ? "bg-blue-500 text-white" : "bg-gray-700 text-gray-300"
        } hover:bg-blue-400 hover:text-white transition-colors`}
        onClick={() => handleFilterChange(category, option)}
      >
        {option}
      </button>
    ));

  return (
    <div className="ml-[240px] pt-[4rem] bg-gray-900 text-white min-h-screen flex flex-col">
      {/* Filter Section */}
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-6 space-y-4">
          {Object.keys(filterOptions).map((filter) => (
            <div key={filter} className="flex items-center space-x-4">
              <h2 className="text-sm font-bold uppercase min-w-[80px]">{filter}</h2>
              <div className="flex flex-wrap gap-2">{renderFilterButtons(filter)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Cards Section */}
      <div className="flex-grow p-6 max-w-6xl mx-auto overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredPlaylists.length > 0 ? (
            filteredPlaylists.map((playlist) => (
              <Card
                key={playlist.id}
                image={playlist.image}
                title={playlist.title}
                views={playlist.views}
              />
            ))
          ) : (
            <p className="text-gray-400 text-center col-span-full">
              No playlists match the selected filters.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
