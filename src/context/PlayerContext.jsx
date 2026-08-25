import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { trackSongPlayApi } from '../services/apiSongs.js';
import { getSavedPlayback, savePlaybackState } from '../utils/helpers.js';

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const savedState = getSavedPlayback();

  const [currentSong, setCurrentSong] = useState(savedState?.song || null);
  const [queue, setQueue] = useState(savedState?.queue || []);

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  const audioRef = useRef(null);
  const hasCountedPlayRef = useRef(false);
  const isUserActionRef = useRef(false);

  useEffect(() => {
    if (currentSong) {
      savePlaybackState(currentSong, queue);
    }
  }, [currentSong, queue]);

  useEffect(() => {
    hasCountedPlayRef.current = false;
  }, [currentSong?.id]);

  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    const src = currentSong.audio_url || currentSong.song_url;
    if (!src) return;

    if (audioRef.current.src !== src) {
      audioRef.current.src = src;
    }

    if (!isUserActionRef.current) {
      setIsPlaying(false);
      return;
    }

    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((error) => {
          if (error.name !== 'AbortError') console.error('Playback error:', error);
          setIsPlaying(false);
        });
    }
  }, [currentSong]);

  function playSong(song, newQueue = null) {
    if (!song) return;

    if (newQueue && Array.isArray(newQueue) && newQueue.length > 0) {
      setQueue(newQueue);
    } else {
      setQueue((prev) => (prev.length > 0 ? prev : [song]));
    }

    if (Number(currentSong?.id) === Number(song?.id)) {
      togglePlay();
      return;
    }

    isUserActionRef.current = true;
    setCurrentSong(song);
  }

  function pauseSong() {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  }

  function resumeSong() {
    if (!audioRef.current) return;
    isUserActionRef.current = true;
    const playPromise = audioRef.current.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsPlaying(true))
        .catch((err) => console.error('Resume error:', err));
    }
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      pauseSong();
    } else {
      resumeSong();
    }
  };

  const playNext = () => {
    if (!queue.length || !currentSong) return;

    const currentIndex = queue.findIndex(
      (s) => Number(s?.id) === Number(currentSong?.id)
    );

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % queue.length;
      isUserActionRef.current = true;
      setCurrentSong(queue[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (!queue.length || !currentSong || !audioRef.current) return;

    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const currentIndex = queue.findIndex(
      (s) => Number(s?.id) === Number(currentSong?.id)
    );

    if (currentIndex > 0) {
      isUserActionRef.current = true;
      setCurrentSong(queue[currentIndex - 1]);
    } else {
      audioRef.current.currentTime = 0;
    }
  };

  function changeVolume(newVolume) {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }

  const onTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const totalDuration = audioRef.current.duration || 0;

    setCurrentTime(current);

    const playThreshold = totalDuration > 0 && totalDuration < 30 ? totalDuration * 0.5 : 30;

    if (current >= playThreshold && !hasCountedPlayRef.current && currentSong?.id) {
      hasCountedPlayRef.current = true;
      trackSongPlayApi(currentSong.id);
    }
  };

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const seek = (time) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  return (
    <PlayerContext.Provider
      value={{
        isExpanded,
        setIsExpanded,
        isPlaying,
        togglePlay,
        currentTime,
        duration,
        seek,
        audioRef,
        volume,
        setVolume,
        changeVolume,
        playSong,
        currentSong,
        pauseSong,
        resumeSong,
        setCurrentSong,
        playNext,
        playPrevious,
        queue,
      }}
    >
      {children}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        onEnded={playNext}
      />
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerContextProvider');
  }
  return context;
}

export { PlayerContextProvider, usePlayer };