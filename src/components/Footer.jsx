import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-8 ml-[240px]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        {/* Top Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Explore */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Explore</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Artists</a></li>
              <li><a href="#" className="hover:text-white">Trending Songs</a></li>
              <li><a href="#" className="hover:text-white">New Songs</a></li>
              <li><a href="#" className="hover:text-white">Charts</a></li>
              <li><a href="#" className="hover:text-white">Videos</a></li>
              <li><a href="#" className="hover:text-white">Podcast</a></li>
              <li><a href="#" className="hover:text-white">Buzz</a></li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">For Users</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">Download</a></li>
              <li><a href="#" className="hover:text-white">Help Center</a></li>
              <li><a href="#" className="hover:text-white">Go Premium</a></li>
              <li><a href="#" className="hover:text-white">Wordpress</a></li>
            </ul>
          </div>

          {/* For Artists and Vendors */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">For Artists and Vendors</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">VibeCast for Artists</a></li>
              <li><a href="#" className="hover:text-white">Get Verified</a></li>
              <li><a href="#" className="hover:text-white">Artists FAQ</a></li>
              <li><a href="#" className="hover:text-white">Artists Distributors</a></li>
              <li><a href="#" className="hover:text-white">Vendors Login</a></li>
              <li><a href="#" className="hover:text-white">Report Content Issue</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-white">About</a></li>
              <li><a href="#" className="hover:text-white">Contact</a></li>
              <li><a href="#" className="hover:text-white">Advertising</a></li>
              <li><a href="#" className="hover:text-white">News</a></li>
              <li><a href="#" className="hover:text-white">Visual Identity</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media & Download Links */}
        <div className="mt-8 flex flex-wrap justify-between items-center border-t border-gray-700 pt-6">
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="#" className="text-gray-400 hover:text-white"><FaYoutube size={20} /></a>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#"><img src="https://via.placeholder.com/150x50?text=Google+Play" alt="Google Play" className="h-10" /></a>
            <a href="#"><img src="https://via.placeholder.com/150x50?text=App+Store" alt="App Store" className="h-10" /></a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center border-t border-gray-700 pt-6">
          <p className="text-sm">&copy; 2024 VibeCast. All rights reserved.</p>
          <div className="mt-2 space-x-4 text-sm">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">EULA</a>
            <a href="#" className="hover:text-white">Podcast T&C</a>
            <a href="#" className="hover:text-white">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;