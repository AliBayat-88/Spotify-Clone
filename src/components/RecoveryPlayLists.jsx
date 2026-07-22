import { useState } from "react";
import Header from './Header.jsx';
import BackBtn from './BackBtn.jsx'
import ActionBtn from './ActionBtn.jsx'

function RecoveryPlayLists() {
  const [deletedPlaylists] = useState([
    { id: 1, title: "Midnight Driving", deletedDate: "2026/05/12", songsCount: 42 },
    { id: 2, title: "Gym Beats 2025", deletedDate: "2026/04/28", songsCount: 18 },
    { id: 3, title: "Acoustic Morning", deletedDate: "2026/04/01", songsCount: 65 },
  ]);

  return (
    <div className="min-h-screen bg-black text-white pb-32 select-none">
      <Header />
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <div className="flex items-center justify-between border-b border-[#262626] pb-4">
          <BackBtn/>
          <h1 className="text-lg sm:text-3xl font-bold tracking-tight">Recover Playlists</h1>
          <div className="w-10"></div>
        </div>

        <div className="bg-[#181818] border border-[#262626] rounded-2xl p-4 sm:p-5 mt-6 shadow-lg">
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            If you deleted a playlist within the last <span className="text-white font-semibold">90 days</span>, you can get it back. Find the playlist you want to recover below and click <span className="text-[#1ed760] font-semibold">Restore</span>.
          </p>
        </div>

        {/* ۳. جدول پنل مدیریتی پلی‌لیست‌ها */}
        <div className="mt-8 bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">

          {deletedPlaylists.length === 0 ? (
            /* حالت خالی بودن لیست */
            <div className="text-center py-12 text-gray-500 text-sm font-medium">
              No recently deleted playlists found.
            </div>
          ) : (
            <>
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                  <tr className="border-b border-[#262626] text-gray-400 font-bold uppercase text-[11px] tracking-wider">
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Deleted Date</th>
                    <th className="py-4 px-6">Songs</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                  </thead>
                  <tbody className="divide-y divide-[#262626]/50">
                  {deletedPlaylists.map((playlist) => (
                    <tr key={playlist.id} className="hover:bg-[#262626]/30 transition-colors group">
                      <td className="py-4 px-6 font-semibold text-white tracking-tight">{playlist.title}</td>
                      <td className="py-4 px-6 text-gray-400">{playlist.deletedDate}</td>
                      <td className="py-4 px-6 text-gray-400">{playlist.songsCount} songs</td>
                      <td className="py-4 px-6 text-right">
                        <ActionBtn
                          title="Restore"
                          className="bg-transparent border border-gray-500 hover:border-white text-white hover:bg-white hover:text-black text-xs px-4 py-2"
                        />
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="block md:hidden divide-y divide-[#262626]/50">
                {deletedPlaylists.map((playlist) => (
                  <div key={playlist.id} className="p-4 flex flex-col gap-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-y-0.5">
                        <h3 className="font-bold text-white text-base tracking-tight">{playlist.title}</h3>
                        <p className="text-gray-400 text-xs">{playlist.songsCount} songs</p>
                      </div>
                      <span className="text-[11px] bg-[#262626] text-gray-400 px-2 py-0.5 rounded-md border border-[#3e3e3e]">
                        {playlist.deletedDate}
                      </span>
                    </div>
                    <button
                      className="w-full bg-[#262626] border border-[#3e3e3e] text-white active:bg-white active:text-black text-xs font-bold py-2.5 rounded-xl transition-all active:scale-[0.98] cursor-pointer"
                    >
                      Restore Playlist
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default RecoveryPlayLists;