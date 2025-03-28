import React, { useEffect } from "react";

const CLIENT_ID = "your_spotify_client_id";
const REDIRECT_URI = "http://localhost:3000/";
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
const RESPONSE_TYPE = "token";

const SpotifyAuth = ({ setToken }) => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash
        .substring(1)
        .split("&")
        .find((item) => item.startsWith("access_token"))
        ?.split("=")[1];

      if (token) {
        setToken(token);
        localStorage.setItem("spotifyToken", token);
      }
      window.location.hash = "";
    }
  }, [setToken]);

  const login = () => {
    window.location.href = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`;
  };

  return <button onClick={login}>Login with Spotify</button>;
};

export default SpotifyAuth;