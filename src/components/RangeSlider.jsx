
import { usePlayer } from '../context/PlayerContext.jsx'

function RangeSlider() {
  const {volume , changeVolume} = usePlayer()

  const percentage = volume;

  const icon =
    volume == 0
      ? "/volume-mute-line.svg"
      : volume <= 50
        ? "/volume-down-fill.svg"
        : "/volume-up-fill.svg";

  return (
    <div className="flex items-center gap-x-2">

      <img src={icon} className="w-5 h-5" />

      <div className="w-20 lg:w-28 flex items-center group">
        <div className="relative w-full h-1 bg-gray-600 rounded-full">

          <div
            className="absolute top-0 left-0 h-1 bg-white rounded-full"
            style={{ width: `${percentage}%` }}
          />

          <input
            type="range"
            min="0"
            max="100"
            value={volume}
            onChange={(e) => changeVolume(Number(e.target.value))}
            className="
              absolute top-0 left-0 w-full h-1
              appearance-none bg-transparent
              cursor-pointer
            "
          />
        </div>
      </div>
    </div>
  );
}

export default RangeSlider;