import { useState } from 'react';
import PlusIcon from './plusIcon.jsx';
import AnimatedCheckIcon from './AnimatedCheckIcon.jsx';
import TrackDropdown from './TrackDropDown.jsx';
import DownloadIcon from './DownloadIcon.jsx';
import PlayButton from './PlayButton.jsx';
import { useToaster } from '../context/ToastContext.jsx';
import { usePlayer } from '../context/PlayerContext.jsx';
import PauseBtn from './PauseBtn.jsx';
import { useToggleLikeSong } from '../hooks/useToggleLikedSong.js';
import { useAuth } from '../context/Auth.jsx';
import AuthRequiredModal from './AuthRequiredModal.jsx';

function TrackActions({ audioUrl, songName, song , songs = [] }) {
  const { showToast } = useToaster();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { playSong, isPlaying,togglePlay,
    currentSong } = usePlayer();
  const { isLiked, toggleLike } = useToggleLikeSong(song);
  const { user } = useAuth();


  const isCurrentArtistPlaying = songs.some(
    (s) => Number(s?.id) === Number(currentSong?.id)
  );

  function handlePlay() {
    if (!songs || songs.length === 0) return;

    if (isCurrentArtistPlaying) {
      togglePlay();
    } else {
      playSong(songs[0], songs);
    }
  }

  const [isDownloading, setIsDownloading] = useState(false);


  const handleDownload = async () => {
    if (!audioUrl) {
      showToast("Error", "No audio URL found!", "error");
      return;
    }else if (!user){
      setIsAuthModalOpen(true);
      return
    }

    try {
      setIsDownloading(true);
      showToast("Downloading...", "Please wait", "info");

      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${songName || 'Track'}.mp3`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      window.URL.revokeObjectURL(blobUrl);

      showToast("Downloaded!", "Check your downloads folder.", "success");
    } catch (error) {
      console.error("Download failed:", error);
      showToast("Failed", "Could not download the file.", "error");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="flex gap-x-3 items-center child:transition-all">
        <button
          onClick={handlePlay}
          className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 inline-flex justify-center items-center"
        >
          {isPlaying ? <PauseBtn className="w-8 h-8 text-black"/> : <PlayButton className="w-8 h-8"/>}
        </button>

        <div onClick={toggleLike} className="cursor-pointer">
          {isLiked ? (
            <AnimatedCheckIcon size="big"/>
          ) : (
            <button
              className="hover:border-gray-400 border-white border-2 sm:border-[3px] inline-flex p-1 rounded-full bg-transparent text-gray-400 hover:text-white">
              <PlusIcon className="w-6 sm:w-7 h-6 sm:h-7"/>
            </button>
          )}
        </div>

        <button
          onClick={handleDownload}
          disabled={isDownloading}
          className={`border-[2px] sm:border-[3px] inline-flex p-1 rounded-full 
          ${isDownloading ? 'opacity-50 cursor-not-allowed border-gray-500 text-gray-500' : 'border-gray-300 hover:border-gray-500 hover:text-white text-gray-300'}`}
        >
          <DownloadIcon className="w-6 sm:w-7 h-6 sm:h-7"/>
        </button>

        <TrackDropdown isLiked={isLiked} song={song}/>
      </div>

      {/* ۳. مودال خارج از div و درون Fragment قرار گرفت */}
      <AuthRequiredModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

export default TrackActions;