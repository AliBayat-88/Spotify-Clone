import { createContext, useContext, useState, useRef, useEffect } from 'react';
import { trackSongPlayApi } from '../services/apiSongs.js';

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

  // 🟢 ۱. پرچم پیگیری شمارش پخش (بدون ایجاد Re-render اضافی در پلیر)
  const hasCountedPlayRef = useRef(false);

  // 🟢 ۲. هر زمان که آهنگ تغییر کرد، پرچم شمارش را ریست می‌کنیم
  useEffect(() => {
    hasCountedPlayRef.current = false;
  }, [currentSong?.id]);

  // 🟢 ۳. پخش آهنگ و تنظیم صف
  function playSong(song, newQueue = null) {
    if (!song) return;

    if (newQueue && Array.isArray(newQueue) && newQueue.length > 0) {
      setQueue(newQueue);
    } else {
      setQueue((prev) => (prev.length > 0 ? prev : [song]));
    }

    // اگر همان آهنگ جاری انتخاب شد، فقط پاز/پلی شود
    if (Number(currentSong?.id) === Number(song?.id)) {
      togglePlay();
      return;
    }

    setCurrentSong(song);
  }

  // 🟢 ۴. اجرای پخش خودکار هنگام تغییر آهنگ
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

  // 🟢 ۵. آهنگ بعدی (حلقه بی‌پایان صف)
  const playNext = () => {
    if (!queue.length || !currentSong) return;

    const currentIndex = queue.findIndex(
      (s) => Number(s?.id) === Number(currentSong?.id)
    );

    if (currentIndex !== -1) {
      const nextIndex = (currentIndex + 1) % queue.length;
      setCurrentSong(queue[nextIndex]);
    }
  };

  // 🟢 ۶. آهنگ قبلی
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

  // 🟢 ۷. قلب تپنده محاسبه زمان و ثبت شمارش پخش واقعی
  const onTimeUpdate = () => {
    if (!audioRef.current) return;

    const current = audioRef.current.currentTime;
    const totalDuration = audioRef.current.duration || 0;

    setCurrentTime(current);

    // تعیین آستانه مجاز (Threshold):
    // اگر آهنگ کمتر از ۳۰ ثانیه بود، ۵۰٪ آهنگ؛ در غیر این صورت ۳۰ ثانیه
    const playThreshold = totalDuration > 0 && totalDuration < 30 ? totalDuration * 0.5 : 30;

    // بررسی شرط: اگر به آستانه رسید و قبلاً برای این دور شمرده نشده بود
    if (current >= playThreshold && !hasCountedPlayRef.current && currentSong?.id) {
      hasCountedPlayRef.current = true; // علامت‌گذاری تا دیگر در این دور شمرده نشود
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