import React, { useState, useEffect } from 'react';

// Carousel Component
const Carousel = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative w-full h-64 mb-8">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={slide.imageUrl}
            alt={slide.title}
            className="w-full h-64 object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-start p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-white">{slide.title}</h3>
            <p className="text-gray-300">{slide.artist}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Category Section Component
const CategorySection = ({ title, cardData }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-4">{title}</h2>
    <div className="flex overflow-x-auto overflow-y-hidden whitespace-nowrap space-x-4 scrollbar-hide">
      {cardData.map((item, index) => (
        <div key={index} className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex-shrink-0">
          <img
            src={item.imageUrl}
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

const Home = () => {
  const [data, setData] = useState([]);
  const [carouselSlides, setCarouselSlides] = useState([]);
  const [hotlistData, setHotlistData] = useState([]);

  // Fetch data from the JSON server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/TopSongs');
        const fetchedData = await response.json();

        setData(fetchedData);
        setCarouselSlides(fetchedData.slice(0, 5)); // First 5 songs for the carousel
        setHotlistData(fetchedData.slice(5, 15)); // Next 10 songs for Hotlist
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen ml-[200px]">
      <div className="max-w-full p-6 space-y-6">
        {/* Carousel Section */}
        {carouselSlides.length > 0 && <Carousel slides={carouselSlides} />}

        {/* Hotlist Section */}
        {hotlistData.length > 0 && (
          <CategorySection title="🔥 Hotlist" cardData={hotlistData} />
        )}

        {/* Dynamically Render Other Sections */}
        {data.length > 0 && (
          <CategorySection
            title="🎵 All Songs"
            cardData={data.slice(15)} // Remaining songs for All Songs category
          />
        )}
      </div>
    </div>
  );
};

export default Home;
