import { usePlayer } from "../context/PlayerContext";

function AudioPlay() {
  const { currentTime, duration, seek } = usePlayer();

  // تبدیل ثانیه به فرمت 00:00
  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // محاسبه درصد پیشرفت برای استایل CSS
  const progressPercent = (currentTime / duration) * 100 || 0;

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left; // جایی که کلیک شده
    const width = rect.width; // کل عرض نوار
    const newTime = (clickX / width) * duration;
    seek(newTime);
  };

  return (
    <div className="w-full flex items-center gap-x-3 select-none">
      <span className="text-xs font-medium text-[#b3b3b3] w-9 text-right font-mono">
    {formatTime(currentTime)}
  </span>
      <div
        onClick={handleProgressClick}
        className="relative flex-1 md:flex-initial md:w-56 lg:w-80 py-3 group cursor-pointer"
      >
        <div className="w-full h-1 bg-[#4d4d4d] rounded-full overflow-hidden">
          <div
            className="h-full bg-white group-hover:bg-[#1db954] rounded-full transition-colors duration-150"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <div
          className="absolute top-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 shadow-md transition-opacity duration-150"
          style={{
            left: `${progressPercent}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      </div>
      <span className="text-xs font-medium text-[#b3b3b3] w-9 font-mono">
    {formatTime(duration)}
  </span>
    </div>
  );
}

export default AudioPlay;