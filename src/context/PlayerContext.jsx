import { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

function PlayerContextProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);
  const [queue, setQueue] = useState([]); // صف پخش آهنگ‌ها

  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(100);

  const audioRef = useRef(null);

  // 🟢 ۱. پخش آهنگ و ست کردن صف جدید
  function playSong(song, newQueue = null) {
    if (!song) return;

    // ست کردن صف پخش
    if (newQueue && Array.isArray(newQueue) && newQueue.length > 0) {
      setQueue(newQueue);
    } else {
      setQueue((prev) => (prev.length > 0 ? prev : [song]));
    }

    // اگر همان آهنگ فعلی انتخاب شده، پاز/پلی کن
    if (Number(currentSong?.id) === Number(song?.id)) {
      togglePlay();
      return;
    }

    setCurrentSong(song);
  }

  // 🟢 ۲. پخش خودکار با تغییر آهنگ
  useEffect(() => {
    if (!currentSong || !audioRef.current) return;

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((err) => {
        console.error("Playback error:", err);
        setIsPlaying(false);
      });
  }, [currentSong]);

  function pauseSong() {
    audioRef.current?.pause();
    setIsPlaying(false);
  }

  function resumeSong() {
    if (!audioRef.current) return;
    audioRef.current
      .play()
      .then(() => setIsPlaying(true))
      .catch((err) => console.error("Resume error:", err));
  }

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.error("Toggle play error:", err));
    }
  };

  // 🟢 ۳. آهنگ بعدی
  const playNext = () => {
    if (!queue.length || !currentSong) return;

    const currentIndex = queue.findIndex(
      (s) => Number(s?.id) === Number(currentSong?.id)
    );

    if (currentIndex !== -1 && currentIndex < queue.length - 1) {
      const nextSong = queue[currentIndex + 1];
      setCurrentSong(nextSong);
    }
  };

  // 🟢 ۴. آهنگ قبلی
  const playPrevious = () => {
    if (!queue.length || !currentSong || !audioRef.current) return;

    // اگر بیش از ۳ ثانیه گذشته، آهنگ از اول شروع می‌شود
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      return;
    }

    const currentIndex = queue.findIndex(
      (s) => Number(s?.id) === Number(currentSong?.id)
    );

    if (currentIndex > 0) {
      const prevSong = queue[currentIndex - 1];
      setCurrentSong(prevSong);
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
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
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
        src={currentSong?.audio_url}
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