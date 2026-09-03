import { usePlayer } from '../context/PlayerContext.jsx'
import ChevronDown from './icons/ChevronDown.jsx'
import BackWardBtn from './BackWardBtn.jsx'
import PauseBtn from './PauseBtn.jsx'
import ForwardBtn from './ForwardBtn.jsx'
import AudioPlay from './AudioPlay.jsx'
import PlayBtn from './PlayBtn.jsx'
import AddLikedSongsBtn from './AddLikedSongsBtn.jsx'
import { useArtist } from '../features/useArtist.js'
import { useToggleLikeSong } from '../hooks/useToggleLikedSong.js'
import ActionBtn from './ActionBtn.jsx'
import { useArtistFollow } from '../hooks/useArtistFollow.js'

function MobilePlayer() {
  const { isExpanded, setIsExpanded, isPlaying, togglePlay, playNext, playPrevious, currentSong } = usePlayer();
  const { isLiked, toggleLike } = useToggleLikeSong(currentSong);


  const artistId = currentSong?.artist_id || currentSong?.artists?.id;
  const { artist, isLoading } = useArtist(artistId);
  const {isFollowed , handleFollowToggle} = useArtistFollow(artistId)

  const artistName = artist?.name || currentSong?.artists?.name || "Unknown Artist";
  const artistBio = artist?.bio || currentSong?.artists?.bio || "No biography available for this artist.";
  const artistImage = artist?.image_url || currentSong?.artists?.image_url || currentSong?.cover_url;

  const whichIcon = isPlaying ? (
    <PauseBtn className="w-9 sm:w-7 h-9 sm:h-7" />
  ) : (
    <PlayBtn src="/play.svg" color="#262626" className="w-9 sm:w-7 h-9 sm:h-7" alt="Play" />
  );

  return (
    <div
      className={`
        fixed inset-0 bg-spotify-base bg-[linear-gradient(to_bottom,rgba(45,45,45,0.6)_0%,#121212_100%)] z-50 md:hidden 
        flex flex-col select-none overflow-y-auto scrollbar-none pb-8
        transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        ${isExpanded ? "translate-y-0" : "translate-y-full"}
      `}
    >
      <div className="sticky top-0 z-30 flex justify-between items-center w-full px-6 py-5 bg-[#1e1e1e]/10 backdrop-blur-md border-b border-white/5">
        <div onClick={() => setIsExpanded(false)} className="p-1 active:scale-95 transition-transform">
          <ChevronDown className="w-7 h-7 text-spotify-subtext cursor-pointer hover:text-white transition-colors" />
        </div>
        <p className="text-xs uppercase tracking-widest font-bold text-spotify-subtext">Now Playing</p>
        <div className="w-7 h-7"></div>
      </div>

      <div className="px-6 flex flex-col flex-1">
        <div className="flex items-center justify-center my-8">
          <div className="w-full max-w-[330px] aspect-square rounded-lg overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] active:scale-[0.98] transition-transform duration-300">
            <img loading="lazy" src={currentSong?.cover_url} className="w-full h-full object-cover" alt="Album Cover" />
          </div>
        </div>

        <div className="w-full flex flex-col gap-y-6 mb-6">
          <div className="flex justify-between items-center w-full px-1">
            <div className="flex flex-col gap-y-1">
              <h1 className="text-2xl font-bold text-white tracking-tight leading-tight">{currentSong?.name}</h1>
              <p className="text-sm font-medium text-spotify-subtext hover:text-white transition-colors cursor-pointer">
                {artistName}
              </p>
            </div>
            <AddLikedSongsBtn isLiked={isLiked} onClick={toggleLike}/>
          </div>

          <div className="w-full px-1">
            <AudioPlay />
          </div>

          <div className="flex items-center justify-center gap-x-8 mt-2">
            <button className="bg-transparent border-none p-2 text-spotify-subtext hover:text-white active:scale-90 transition-all focus:outline-none">
              <BackWardBtn onClick={playPrevious} className="fill-current w-8 h-8" />
            </button>
            <div
              onClick={togglePlay}
              className="w-16 h-16 rounded-full bg-spotify-green flex items-center justify-center shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              {whichIcon}
            </div>
            <button className="bg-transparent border-none p-2 text-spotify-subtext hover:text-white active:scale-90 transition-all focus:outline-none">
              <ForwardBtn onClick={playNext} className="fill-current w-8 h-8" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-2xl p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.4)] mt-6">
          <div className="absolute -top-16 -right-16 w-34 h-34 bg-spotify-green/15 blur-[60px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-full overflow-hidden border-2 border-white/10 shadow-lg">
                  <img loading="lazy" src={artistImage} alt={artistName} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#a0a0a0] font-bold">About the Artist</span>
                  <h3 className="text-white font-bold text-base leading-tight mt-0.5">{artistName}</h3>
                </div>
              </div>

              <ActionBtn onClick={handleFollowToggle}
                         title={isFollowed ? "Following" : "Follow"}
                         className={
                           isFollowed
                             ? "bg-white text-black text-sm px-3.5 py-1.5 border-2 border-white"
                             : "bg-transparent text-white text-sm px-3.5 py-1.5 border-2 border-white hover:bg-white/10"
                         } />
            </div>

            <p className="text-[#c7c7c7] text-sm leading-relaxed font-normal text-justify">
              {isLoading && !currentSong?.artists?.bio ? "Loading artist info..." : artistBio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobilePlayer;