import React, { useState, useEffect } from "react";

const Genre = () => {
  const [genres, setGenres] = useState([]);

  // Fetch genres from a data source
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch("http://localhost:3000/genres"); // Endpoint for genre data
        const data = await response.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  return (
    <div className="flex-1 bg-gray-900 text-white min-h-screen pt-16 ml-[200px] overflow-auto">
      {/* Cards Section */}
      <div className="p-6 max-w-full">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <div
                key={genre.id}
                className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden group cursor-pointer"
              >
                <img
                  src={genre.imageUrl}
                  alt={genre.title}
                  className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center text-xl font-bold text-white group-hover:bg-opacity-50 transition">
                  {genre.title}
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-400">
              No genres found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Genre;
