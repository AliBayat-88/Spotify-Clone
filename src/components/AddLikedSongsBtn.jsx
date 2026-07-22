import AnimatedCheckIcon from './AnimatedCheckIcon.jsx'
import PlusIcon from './plusIcon.jsx'

function AddLikedSongsBtn({ isLiked, onClick }) {
  return (
    <div onClick={onClick} className="pl-6 cursor-pointer">
      {isLiked ? (
        <AnimatedCheckIcon size="sm" />
      ) : (
        <button
          className="border-gray-400 hover:border-white transition-all hover:scale-105 active:scale-95 border-[2px] inline-flex p-1 rounded-full bg-transparent text-gray-400 hover:text-white cursor-pointer"
        >
          <PlusIcon className="w-3 h-3 stroke-current fill-current" />
        </button>
      )}
    </div>
  );
}

export default AddLikedSongsBtn;