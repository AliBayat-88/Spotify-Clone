import { useState } from 'react'; // 👈 اضافه شد برای حالت لودینگ دانلود
import PlusIcon from './plusIcon.jsx'
import AnimatedCheckIcon from './AnimatedCheckIcon.jsx'
import TrackDropdown from './TrackDropDown.jsx'
import DownloadIcon from './DownloadIcon.jsx'
import PlayButton from './PlayButton.jsx'
import { useToaster } from '../context/ToastContext.jsx'
import { usePlayer } from '../context/PlayerContext.jsx'
import PauseBtn from './PauseBtn.jsx'
import { useAddLikedSongs } from '../features/useAddLikedSongs.js'
import { useAuth } from '../context/Auth.jsx'
import { useLikedSongs } from '../features/useLikedSongs.js'
import { useDeleteLikedSong } from '../features/useDeleteLikedSong.js'

function TrackActions({ audioUrl, songName, song }) {
  const { showToast } = useToaster()
  const { playSong, isPlaying } = usePlayer()
  const { addLikedSongs } = useAddLikedSongs()
  const { deleteLikedSong } = useDeleteLikedSong()
  const { user } = useAuth()

  const { data: likedSongs = [] } = useLikedSongs()
  const [isDownloading, setIsDownloading] = useState(false);

  function handlePlay () {
    playSong(song)
  }

  console.log(song?.id)

  const isLiked = likedSongs.some((item) => {
    if (typeof item === 'number' || typeof item === 'string') {
      return Number(item) === Number(song?.id);
    }
    return Number(item?.id || item?.song_id) === Number(song?.id);
  });


  async function handleAddToLibrary () {
    if (!user) return showToast("You need to login first", "Please login to use this feature", "error" , "link" , "/login");

    if (isLiked) {
      deleteLikedSong({ userId: user.id, likedSongId: song.id });
    } else {
      addLikedSongs({ userId: user.id, likedSongId: song.id });
    }
  }

    const handleDownload = async () => {
      if (!audioUrl) {
        showToast("Error", "No audio URL found!", "error");
        return;
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
      <div className="flex gap-x-3 items-center child:transition-all">
        <button onClick={() => handlePlay()}
                className="p-2.5 sm:p-3.5 rounded-full bg-green-500 hover:bg-green-600 inline-flex justify-center items-center">
          {isPlaying ? <PauseBtn className="w-8 h-8 text-black"/> : <PlayButton className="w-8 h-8"/>}
        </button>


        <div onClick={handleAddToLibrary} className="cursor-pointer">
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
          disabled={isDownloading} // وقتی داره دانلود میشه دکمه غیرفعال بشه
          className={`border-[2px] sm:border-[3px] inline-flex p-1 rounded-full 
          ${isDownloading ? 'opacity-50 cursor-not-allowed border-gray-500 text-gray-500' : 'border-gray-300 hover:border-gray-500 hover:text-white text-gray-300'}`}
        >
          <DownloadIcon className="w-6 sm:w-7 h-6 sm:h-7"/>
        </button>

        <TrackDropdown song={song}/>
      </div>
    );
  }


export default TrackActions;