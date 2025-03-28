import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../components/card"; // For playlist and genres
import SongRow from "../components/SongRow"; // For songs
import ArtistCard from "../components/ArtistCard"; // Custom component for artists

const SearchPage = () => {
  const [results, setResults] = useState([]); // Combined search results
  const [filteredResults, setFilteredResults] = useState([]); // Results based on selected filter
  const [activeFilter, setActiveFilter] = useState("music"); // Default to "music"
  const [isLoading, setIsLoading] = useState(true); // Loading state
  const location = useLocation(); // Get query string from URL
  const query = new URLSearchParams(location.search).get("query"); // Extract search query

  useEffect(() => {
    const fetchResults = async () => {
      try {
        setIsLoading(true);

        // Fetch data from all endpoints
        const [
          songsResponse,
          topSongsResponse,
          artistsResponse,
          playlistResponse,
          genresResponse,
        ] = await Promise.all([
          axios.get("http://localhost:3000/songs"),
          axios.get("http://localhost:3000/TopSongs"),
          axios.get("http://localhost:3000/artists"),
          axios.get("http://localhost:3000/playlist"),
          axios.get("http://localhost:3000/genres"),
        ]);

        // Combine songs and TopSongs into a single "Music" category
        const musicResults = [
          ...songsResponse.data,
          ...topSongsResponse.data,
        ].map((item) => ({ ...item, type: "music" }));

        // Add type field to other endpoints
        const allResults = [
          ...musicResults,
          ...artistsResponse.data.map((item) => ({ ...item, type: "artists" })),
          ...playlistResponse.data.map((item) => ({ ...item, type: "playlist" })),
          ...genresResponse.data.map((item) => ({ ...item, type: "genres" })),
        ];

        // Filter results based on the search query
        const filtered = allResults.filter((item) => {
          const searchableFields = [
            item.title,
            item.artist,
            item.name,
            item.genre,
          ];
          return searchableFields.some(
            (field) =>
              field && field.toLowerCase().includes(query.toLowerCase())
          );
        });

        setResults(filtered);
        setFilteredResults(filtered.filter((item) => item.type === activeFilter)); // Show results for default filter
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (query) fetchResults();
  }, [query, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setFilteredResults(results.filter((item) => item.type === filter)); // Update results based on the filter
  };

  return (
    <div className="bg-gray-900 ml-[200px] text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-6">Search Results for "{query}"</h1>

      {/* Filters */}
      <div className="flex space-x-4 mb-6">
        {["music", "artists", "playlist", "genres"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-4 py-2 rounded-full ${
              activeFilter === filter
                ? "bg-cyan-500 text-black"
                : "bg-gray-800 text-gray-300"
            } hover:bg-cyan-400 hover:text-black transition`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)} {/* Capitalize */}
          </button>
        ))}
      </div>

      {/* Display Results */}
      {isLoading ? (
        <p className="text-gray-400">Loading...</p>
      ) : filteredResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredResults.map((item, index) => {
            if (item.type === "music") {
              // Render SongRow for music results
              return (
                <div key={index} className="col-span-full">
                  <SongRow
                    number={index + 1}
                    title={item.title}
                    artist={item.artist}
                    views={item.views}
                    image={item.imageUrl}
                    audioUrl={item.audioUrl}
                  />
                </div>
              );
            } else if (item.type === "artists") {
              // Render ArtistCard for artists
              return (
                <ArtistCard
                  key={index}
                  name={item.name}
                  genre={item.genre}
                  image={item.imageUrl}
                />
              );
            } else if (item.type === "playlist" || item.type === "genres") {
              // Render Card for playlist and genres
              return (
                <Card
                  key={index}
                  title={item.title}
                  image={item.image || item.imageUrl}
                  views={item.views}
                />
              );
            } else {
              return null; // Handle unexpected types
            }
          })}
        </div>
      ) : (
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-gray-400">Nothing Found</h2>
          <p className="text-gray-500 mt-2">
            We couldn’t find any matches for "{query}". Try searching for
            something else.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
