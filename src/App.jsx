import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Footer from "./components/footer";
import Home from "./pages/home";
import Artist from "./pages/artist";
import New from "./pages/new";
import Trending from "./pages/Trending";
import Playlist from "./pages/playlist";
import Player from "./components/player";
import LoginSignup from "./pages/LoginSignup";
import Genre from "./pages/Genre";
import Favourites from "./pages/Favourites";
import AddPlaylist from "./components/AddPlaylist";
import MyPlaylist from "./pages/MyPlaylist";
import User from "./pages/User";
import EditProfile from "./pages/EditProfile";
import Search from "./components/Search";
import SpotifyAuth from "./components/SpotifyAuth";
import axios from "axios";

const CLIENT_ID = "your_spotify_client_id";
const REDIRECT_URI = "http://localhost:3000/";

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [spotifyToken, setSpotifyToken] = useState(
    localStorage.getItem("spotifyToken")
  );
  const [spotifyPlaylists, setSpotifyPlaylists] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setLoggedInUser(savedUser);
    }
  }, []);

  useEffect(() => {
    if (spotifyToken) {
      fetchSpotifyPlaylists(spotifyToken);
    }
  }, [spotifyToken]);

  const fetchSpotifyPlaylists = async (token) => {
    try {
      const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSpotifyPlaylists(response.data.items);
    } catch (error) {
      console.error("Error fetching Spotify playlists:", error);
    }
  };

  const handleLogout = () => {
    setLoggedInUser(null);
    localStorage.removeItem("loggedInUser");
  };

  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen flex flex-col">
        <Navbar loggedInUser={loggedInUser} onLogout={handleLogout} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar loggedInUser={loggedInUser} />
          <div className="flex-1 pt-16 overflow-auto">
            <SpotifyAuth setToken={setSpotifyToken} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/artist" element={<Artist />} />
              <Route path="/new" element={<New />} />
              <Route path="/trending" element={<Trending />} />
              <Route path="/playlist" element={<Playlist />} />
              <Route path="/genre" element={<Genre />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/myplaylist" element={<MyPlaylist />} />
              <Route path="/user" element={<User />} />
              <Route path="/editprofile" element={<EditProfile />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/login"
                element={<LoginSignup setLoggedInUser={setLoggedInUser} />}
              />
              <Route
                path="/addplaylist"
                element={<AddPlaylist loggedInUser={loggedInUser} />}
              />
            </Routes>
            <div>
              <h2>Spotify Playlists</h2>
              <ul>
                {spotifyPlaylists.map((playlist) => (
                  <li key={playlist.id}>{playlist.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <Player />
        <Footer />
      </div>
    </Router>
  );
};

export default App;