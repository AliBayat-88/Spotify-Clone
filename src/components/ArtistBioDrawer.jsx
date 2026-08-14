import { getMonthlyListeners } from '../utils/helpers.js'

function ArtistBioDrawer({ artist, isOpen, onClose }) {


  if (!artist) return null;

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-[#121212] border-l border-white/10 z-50 p-6 overflow-y-auto shadow-2xl transition-transform duration-300 ease-in-out flex flex-col justify-between ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-white">About the artist</h3>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="relative w-full h-64 rounded-2xl overflow-hidden mb-6 shadow-xl border border-white/5">
            <img
              src={artist?.image_url || '/playlistImg.webp'}
              alt={artist?.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4">
              <span className="text-2xl font-black text-white">{artist?.name}</span>
            </div>
          </div>

          <div className="text-gray-300 text-sm leading-relaxed space-y-4 font-normal">
            <p>
              {artist?.bio ||
                `${artist?.name} is a world-renowned artist bringing unique sounds and unforgettable tracks to listeners globally.`}
            </p>
          </div>
        </div>

        <div className="mt-8 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-gray-400">
          <span>Verified Artist</span>
          <span className="text-white font-semibold">{getMonthlyListeners(artist?.id)} Monthly Listeners</span>
        </div>
      </aside>
    </>
  );
}

export default ArtistBioDrawer;