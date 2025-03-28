import React, { useRef } from 'react';

const CategorySection = ({ title, cardData, isScrollable }) => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // Adjust as needed
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="mb-8">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        {isScrollable && (
          <div className="flex space-x-2">
            <button
              onClick={() => handleScroll('left')}
              className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
            >
              ◀
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600"
            >
              ▶
            </button>
          </div>
        )}
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollRef}
        className={`flex ${
          isScrollable ? 'overflow-x-auto scrollbar-hide' : ''
        } whitespace-nowrap space-x-4`}
      >
        {cardData.map((item, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex-shrink-0"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-gray-400">{item.views} views</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySection;
