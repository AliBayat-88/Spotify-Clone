import { useState } from 'react';
import DashboardTable from './DashboardTable.jsx';
import ActionBtn from '../ActionBtn.jsx';
import TableActions from '../TableActions.jsx'

function DashboardSongs() {
  const [songName, setSongName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [duration, setDuration] = useState('');
  const [lyrics, setLyrics] = useState('');
  const [coverFile, setCoverFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);

  // دیتای ماک جهت نمایش اولیه جدول
  const [songs] = useState([
    { id: 1, name: 'Blinding Lights', artist: 'The Weeknd', duration: '03:20', cover: '/profileImg.png' },
    { id: 2, name: 'Starboy', artist: 'The Weeknd', duration: '03:50', cover: '/profileImg.png' },
    { id: 3, name: 'Shape of You', artist: 'Ed Sheeran', duration: '03:53', cover: '/profileImg.png' },
  ]);

  const tableColumns = [
    'Song',
    'Artist',
    'Duration',
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2">
      {/* هدر صفحه */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Songs</h1>
        <p className="text-sm text-gray-400 mt-1">Add and manage songs in your music library</p>
      </div>

      {/* فرم افزودن آهنگ */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form className="flex flex-col gap-y-5 relative">
          {/* Song Name */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Song Name</label>
            <input
              type="text"
              value={songName}
              onChange={(e) => setSongName(e.target.value)}
              placeholder="Enter song name"
              className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium"
            />
          </div>

          {/* Artist & Duration in 2 Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Artist</label>
              <select
                value={artistId}
                onChange={(e) => setArtistId(e.target.value)}
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium cursor-pointer"
              >
                <option value="" disabled>Select artist</option>
                <option value="1">Ali Bayat</option>
                <option value="2">The Weeknd</option>
                <option value="3">Ed Sheeran</option>
              </select>
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Duration</label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 03:42"
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Cover & Audio Uploaders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <label className="group cursor-pointer flex flex-col items-center justify-center min-h-36 rounded-xl border border-dashed border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5 transition-all p-4">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files[0])} />
              <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V7.75A2.75 2.75 0 015.75 5h12.5A2.75 2.75 0 0121 7.75v8.5A2.75 2.75 0 0118.25 19H5.75A2.75 2.75 0 013 16.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 15 4.5-4.5 3.5 3.5 2.5-2.5L21 18" />
                </svg>
              </div>
              <span className="text-sm text-white font-semibold truncate max-w-[200px]">{coverFile ? coverFile.name : 'Upload Cover'}</span>
              <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
            </label>

            <label className="group cursor-pointer flex flex-col items-center justify-center min-h-36 rounded-xl border border-dashed border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5 transition-all p-4">
              <input type="file" accept="audio/*" className="hidden" onChange={(e) => setAudioFile(e.target.files[0])} />
              <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 18V5l10-2v13" />
                  <circle cx="6" cy="18" r="3" />
                  <circle cx="16" cy="16" r="3" />
                </svg>
              </div>
              <span className="text-sm text-white font-semibold truncate max-w-[200px]">{audioFile ? audioFile.name : 'Upload Audio'}</span>
              <span className="text-xs text-gray-500 mt-0.5">MP3, WAV or FLAC</span>
            </label>
          </div>

          {/* Lyrics */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Lyrics</label>
            <textarea
              value={lyrics}
              onChange={(e) => setLyrics(e.target.value)}
              placeholder="Enter song lyrics..."
              rows={5}
              className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#262626] outline-none resize-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm leading-relaxed"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end items-center gap-3 pt-4 border-t border-white/5">
            <button
              type="button"
              className="px-6 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm transition-all cursor-pointer"
            >
              Cancel
            </button>
            <ActionBtn
              title="Add Song"
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm"
            />
          </div>
        </form>
      </div>

      {/* 🟢 جدول ترانه‌ها با استفاده از DashboardTable جنریک */}
      <DashboardTable
        title="Songs"
        columns={tableColumns}
        data={songs}
        renderRow={(song) => (
          <tr key={song.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <img src={song.cover} alt={song.name} className="w-11 h-11 rounded-lg object-cover bg-black shrink-0 shadow-md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">{song.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">ID: {song.id}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-4 text-sm text-gray-300 font-medium">{song.artist}</td>
            <td className="px-5 py-4 text-sm text-gray-400 font-medium">{song.duration}</td>
            <td className="px-5 py-4">
              <TableActions
                onEdit={() => console.log('Edit playlist:')}
                onDelete={() => console.log('Delete playlist:')}
              />
            </td>
          </tr>
        )}
      />
    </div>
  );
}

export default DashboardSongs;