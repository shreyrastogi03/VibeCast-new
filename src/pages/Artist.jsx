import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";

const Artist = () => {
  const [activeFilters, setActiveFilters] = useState({
    genre: "All",
    gender: "All",
    region: "All",
    alphabet: "Hot",
  });

  const [artistData, setArtistData] = useState([]);

  const filters = {
    genres: [
      "All",
      "Pop",
      "Soul",
      "Electronic",
      "Rock",
      "Country",
      "Reggae",
      "Gospel",
      "World Music/Folklore",
      "Traditional",
      "Highlife",
      "Jazz",
      "New Age",
      "Afrobeats",
      "Afropop",
      "R&B",
      "Hip Hop & Rap",
    ],
    genders: ["All", "Male", "Female", "Group"],
    regions: [
      "All",
      "European & North American",
      "Other",
      "Nigerian",
      "Kenyan",
      "Tanzanian",
      "Ghanaian",
    ],
    alphabet: ["Hot", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""), "#"],
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/artists")
      .then((response) => {
        setArtistData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching artist data:", error);
      });
  }, []);

  const handleFilterChange = (type, value) => {
    setActiveFilters((prev) => ({ ...prev, [type]: value }));
  };

  const filteredArtists = useMemo(() => {
    return artistData.filter((artist) => {
      const matchesGenre =
        activeFilters.genre === "All" || artist.genre === activeFilters.genre;
      const matchesRegion =
        activeFilters.region === "All" || artist.region === activeFilters.region;
      const matchesAlphabet =
        activeFilters.alphabet === "Hot" ||
        (artist.name && artist.name[0].toUpperCase() === activeFilters.alphabet);

      return matchesGenre && matchesRegion && matchesAlphabet;
    });
  }, [artistData, activeFilters]);

  return (
    <div className="ml-[200px] pt-[4rem] bg-gray-900 text-white min-h-screen">
      {/* Filters Section */}
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Genres */}
          <div className="flex gap-2 flex-wrap">
            {filters.genres.map((genre) => (
              <button
                key={genre}
                className={`px-4 py-2 rounded-full ${
                  activeFilters.genre === genre
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700"
                }`}
                onClick={() => handleFilterChange("genre", genre)}
              >
                {genre}
              </button>
            ))}
          </div>

          {/* Genders */}
          <div className="flex gap-2">
            {filters.genders.map((gender) => (
              <button
                key={gender}
                className={`px-4 py-2 rounded-full ${
                  activeFilters.gender === gender
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700"
                }`}
                onClick={() => handleFilterChange("gender", gender)}
              >
                {gender}
              </button>
            ))}
          </div>

          {/* Regions */}
          <div className="flex gap-2">
            {filters.regions.map((region) => (
              <button
                key={region}
                className={`px-4 py-2 rounded-full ${
                  activeFilters.region === region
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700"
                }`}
                onClick={() => handleFilterChange("region", region)}
              >
                {region}
              </button>
            ))}
          </div>

          {/* Alphabet */}
          <div className="flex flex-wrap gap-2">
            {filters.alphabet.map((letter) => (
              <button
                key={letter}
                className={`px-4 py-2 rounded-full ${
                  activeFilters.alphabet === letter
                    ? "bg-blue-500 text-white"
                    : "bg-gray-700"
                }`}
                onClick={() => handleFilterChange("alphabet", letter)}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Artist List */}
      <div className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredArtists.map((artist) => (
            <div
              key={artist.id}
              className="flex flex-col items-center text-center bg-gray-800 rounded-lg p-4 hover:shadow-lg transition-shadow"
            >
              <div className="w-24 h-24 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden mb-4">
                <img
                  src={artist.imageUrl || "https://via.placeholder.com/100"}
                  alt={artist.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold">{artist.name || "Unknown"}</h3>
              <p className="text-gray-400">{artist.topSong || "No Top Song"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artist;
