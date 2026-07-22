import { createContext, useContext, useState, useRef, useEffect } from 'react'

const PlayerContext = createContext()

function PlayerContextProvider({ children }) {
  const [currentSong, setCurrentSong] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(50);

  // این رفرنس مثل "ریموت کنترل" برای تگ audio عمل می‌کنه
  const audioRef = useRef(null)

  function playSong(song) {
    if (currentSong?.id === song?.id) {
      togglePlay();
      return;
    }

    setCurrentSong(song);
  }

  useEffect(() => {
    if (!currentSong) return;

    audioRef.current.play();
    setIsPlaying(true);
  }, [currentSong]);


  function pauseSong() {
    audioRef.current.pause();
    setIsPlaying(false);
  }

  function resumeSong() {
    audioRef.current.play();
    setIsPlaying(true);
  }
  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  function changeVolume(newVolume) {
    console.log(newVolume)
    setVolume(newVolume);

    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  }

  // وقتی زمان آهنگ عوض می‌شه (در حال پخش)، این تابع صدا زده می‌شه
  const onTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime)
  }

  // وقتی اطلاعات آهنگ لود شد، مدت زمان کل رو می‌گیریم
  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration)
  }

  // تابعی برای عقب و جلو بردن آهنگ با کلیک روی نوار
  const seek = (time) => {
    audioRef.current.currentTime = time
    setCurrentTime(time)
  }

  return (
    <PlayerContext.Provider value={{
      isExpanded, setIsExpanded,
      isPlaying, togglePlay,
      currentTime, duration,
      seek, audioRef, volume , setVolume,changeVolume,playSong,currentSong,pauseSong,resumeSong,setCurrentSong
    }}>
      {children}
      {/* تگ اصلی صدا که مخفیه و آهنگ رو پخش می‌کنه */}
      <audio
        ref={audioRef}
        onTimeUpdate={onTimeUpdate}
        onLoadedMetadata={onLoadedMetadata}
        src={currentSong?.audio_url}
      />
    </PlayerContext.Provider>
  );
}

function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used within the context')
  return context
}

export { PlayerContextProvider, usePlayer }