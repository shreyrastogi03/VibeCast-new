import React from 'react';

const ArtistCard = ({ name, genre, image }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer text-center p-4">
      <img
        src={image || "https://via.placeholder.com/150"}
        alt={name}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
      />
      <h3 className="text-white text-lg font-bold truncate">{name}</h3>
      <p className="text-gray-400 text-sm">{genre}</p>
    </div>
  );
};

export default ArtistCard;
