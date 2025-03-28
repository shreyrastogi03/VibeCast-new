import React, { useState, useRef } from "react";
import {
  FaPlay,
  FaPause,
  FaBackward,
  FaForward,
  FaHeart,
  FaShareAlt,
  FaDownload,
  FaRedo,
  FaMusic,
  FaPlus,
} from "react-icons/fa";

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLooping, setIsLooping] = useState(false);

  const audioRef = useRef(null);

  // Format time in MM:SS
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Play/Pause functionality
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip forward
  const skipForward = () => {
    audioRef.current.currentTime = Math.min(currentTime + 10, duration);
  };

  // Skip backward
  const skipBackward = () => {
    audioRef.current.currentTime = Math.max(currentTime - 10, 0);
  };

  // Handle time update
  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime);
  };

  // Handle audio loaded
  const handleLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Toggle loop
  const toggleLoop = () => {
    setIsLooping(!isLooping);
    audioRef.current.loop = !isLooping;
  };

  // Simulate other button actions
  const handleDownload = () => alert("Download button clicked!");
  const handleShare = () => alert("Share button clicked!");
  const handleAddToPlaylist = () => alert("Add to playlist button clicked!");
  const handleLyrics = () => alert("Lyrics button clicked!");

  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white flex items-center justify-between px-6 py-3 shadow-lg z-50">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src="https://via.placeholder.com/50"
          alt="Song Thumbnail"
          className="w-12 h-12 object-cover rounded"
        />
        <div>
          <h4 className="text-sm font-bold">Chance (Na Ham)</h4>
          <p className="text-xs text-gray-400">Seyi Vibez</p>
        </div>
        <button
          className="text-xs bg-gray-700 px-2 py-1 rounded-full hover:bg-gray-600"
          onClick={handleLyrics}
        >
          Lyrics
        </button>
      </div>

      {/* Player Controls */}
      <div className="flex items-center space-x-6">
        <button onClick={skipBackward} className="text-xl">
          <FaBackward />
        </button>
        <button
          onClick={togglePlay}
          className="w-10 h-10 bg-cyan-500 text-black rounded-full flex items-center justify-center"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button onClick={skipForward} className="text-xl">
          <FaForward />
        </button>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center space-x-4">
        <button onClick={toggleLoop} className={`text-lg ${isLooping ? "text-cyan-500" : ""}`}>
          <FaRedo />
        </button>
        <button onClick={handleDownload} className="text-lg">
          <FaDownload />
        </button>
        <button className="text-lg">
          <FaHeart />
        </button>
        <button onClick={handleShare} className="text-lg">
          <FaShareAlt />
        </button>
        <button className="text-lg">
          <FaMusic />
        </button>
        <button onClick={handleAddToPlaylist} className="text-lg">
          <FaPlus />
        </button>
      </div>

      {/* Timer */}
      <div className="text-sm text-gray-400">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>

      {/* Audio Element */}
      <audio
        ref={audioRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      ></audio>
    </div>
  );
};

export default MusicPlayer;
