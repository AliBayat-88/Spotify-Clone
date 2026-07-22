import BackWardBtn from './BackWardBtn.jsx'
import PauseBtn from './PauseBtn.jsx'
import ForwardBtn from './ForwardBtn.jsx'
import AudioPlay from './AudioPlay.jsx'
import RangeSlider from './RangeSlider.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import AddLikedSongsBtn from './AddLikedSongsBtn.jsx'
import { useLibrary } from '../context/LibraryContext.jsx'
import PlayBtn from './PlayBtn.jsx'
import { useArtist } from '../features/useArtist.js'

function PlayerBar() {

  const { setIsExpanded, isPlaying, togglePlay , currentSong} = usePlayer();
  const {isLiked , toggleLiked , setIsLiked , isAlertOpen , setIsAlertOpen , closeAlert} = useLibrary()
  const {artist} = useArtist(currentSong?.artist_id)

  return (
    <>
    <div onClick={() => setIsExpanded(true)} className={`bg-black fixed ${currentSong ? "" : 'translate-y-20'}  bottom-0 right-0 left-0 w-full h-20 p-4 text-white flex items-center justify-between z-10 cursor-pointer md:cursor-default`}>
        <div className="flex items-center gap-x-2 lg:gap-x-3">
          <div>
            <img src={currentSong?.cover_url} className="w-10 lg:w-12 h-10 lg:h-12 rounded-sm"  />
          </div>
          <div className="flex flex-col gap-y-0.5 text-sm">
          <span className="font-semibold">{currentSong?.name}</span>
            <span className="text-white/60">{artist?.name}</span>
          </div>
          <div className="hidden sm:block">
            <AddLikedSongsBtn isAlertOpen={isAlertOpen} closeAlert={closeAlert} setIsAlertOpen={setIsAlertOpen} toggleLiked={toggleLiked} isLiked={isLiked}  setIsLiked={setIsLiked}/>
          </div>
        </div>
      <div className="flex items-center flex-col">
        <div className="flex items-center gap-x-3.5 lg:gap-x-5 child:hidden md:child:block">
          <BackWardBtn className="fill-[#999999] w-7 h-7"/>
          <div
            onClick={(e) => {
              e.stopPropagation();
              togglePlay();
            }}
            className="p-1 rounded-full bg-white hover:opacity-75 transition-opacity cursor-pointer"
          >
            {isPlaying ? (
              <PauseBtn className="fill-black w-7 h-7" />
            ) : (
              <PlayBtn className="fill-black w-7 h-7" />
            )}
          </div>
            <ForwardBtn className="fill-[#999999] w-7 h-7"/>
        </div>
        <div className="hidden md:block">
        <AudioPlay/>
        </div>
      </div>
      <RangeSlider/>
    </div>

    </>
  );
}


export default PlayerBar;
