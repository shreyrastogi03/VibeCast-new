// components/Card.js
import React from 'react';

const Card = ({ image, title, views }) => {
  return (
    <div className="bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <img src={image} alt={title} className="rounded-t-lg w-full h-40 object-cover" />
      <div className="p-3 text-white">
        <h3 className="text-sm font-bold truncate">{title}</h3>
        <p className="text-xs text-gray-400">{views} views</p>
      </div>
    </div>
  );
};

export default Card;