import React from "react";
import {
  FaHome,
  FaFire,
  FaCompactDisc,
  FaUserFriends,
  FaMusic,
  FaHeart,
  FaPlus,
} from "react-icons/fa";

const Sidebar = ({ loggedInUser }) => {
  return (
    <nav className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-[200px] bg-gray-900 text-white shadow-lg py-6 px-4 font-[sans-serif] overflow-auto border-r border-gray-700">
      <div className="mb-6">
        <h6 className="text-gray-400 uppercase font-bold text-sm px-4 mb-4">
          Music
        </h6>
        <ul>
          <li>
            <a
              href="/"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaHome className="text-blue-500" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a
              href="/trending"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaFire />
              <span>Trending</span>
            </a>
          </li>
          <li>
            <a
              href="/new"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaCompactDisc />
              <span>New</span>
            </a>
          </li>
          <li>
            <a
              href="/artist"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaUserFriends />
              <span>Artists</span>
            </a>
          </li>
          <li>
            <a
              href="/playlist"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaMusic />
              <span>Playlists</span>
            </a>
          </li>
          <li>
            <a
              href="/genre"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaCompactDisc />
              <span>Genres</span>
            </a>
          </li>
        </ul>
      </div>

      {/* Library Section */}
      <div className="mb-6">
        <h6 className="text-gray-400 uppercase font-bold text-sm px-4 mb-4">
          Library
        </h6>
        <ul>
          <li>
            <a
              href="/addplaylist"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaPlus />
              <span>Add Playlist</span>
            </a>
          </li>
          <li>
            <a
              href="/favourites"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaHeart />
              <span>Favourites</span>
            </a>
          </li>
          <li>
            <a
              href="/myplaylist"
              className="flex items-center px-4 py-2 space-x-3 text-sm hover:bg-gray-800 hover:text-blue-500 rounded transition"
            >
              <FaMusic />
              <span>My Playlists</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Sidebar;
