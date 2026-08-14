import { useState } from 'react';
import DashboardTable from './DashboardTable.jsx';
import ActionBtn from '../ActionBtn.jsx'
import TableActions from '../TableActions.jsx'

function DashboardArtists() {
  const [artistName, setArtistName] = useState('');
  const [bio, setBio] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  // دیتای ماک جهت نمایش اولیه جدول خواننده‌ها
  const [artists] = useState([
    { id: 1, name: 'Ali Bayat', image: '/profileImg.png', listeners: '1,250,000' },
    { id: 2, name: 'The Weeknd', image: '/profileImg.png', listeners: '4,850,000' },
    { id: 3, name: 'Ed Sheeran', image: '/profileImg.png', listeners: '3,100,000' },
  ]);

  const tableColumns = [
    'Artist',
    'Monthly Listeners',
    { label: 'Actions', align: 'right' }
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2">
      {/* هدر صفحه */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Artists</h1>
        <p className="text-sm text-gray-400 mt-1">Add and manage artists in your music library</p>
      </div>

      {/* فرم افزودن خواننده */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form className="flex flex-col gap-y-5 relative">
          {/* Artist Name */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Artist Name</label>
            <input
              type="text"
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              placeholder="Enter artist name"
              className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium"
            />
          </div>

          {/* Artist Image & Artist Cover */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Image (Avatar) */}
            <label className="group cursor-pointer flex flex-col items-center justify-center min-h-40 rounded-xl border border-dashed border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5 transition-all p-4 overflow-hidden">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setImageFile(e.target.files[0])} />
              {imageFile ? (
                <div className="flex flex-col items-center">
                  <img src={URL.createObjectURL(imageFile)} alt="Artist preview" className="w-20 h-20 rounded-full object-cover border border-[#333]" />
                  <span className="text-xs text-white font-semibold mt-2 truncate max-w-[180px]">{imageFile.name}</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-white font-semibold">Upload Avatar</span>
                  <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
                </>
              )}
            </label>

            {/* Cover Banner */}
            <label className="group cursor-pointer flex flex-col items-center justify-center min-h-40 rounded-xl border border-dashed border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5 transition-all p-4 overflow-hidden">
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setCoverFile(e.target.files[0])} />
              {coverFile ? (
                <div className="w-full flex flex-col items-center">
                  <img src={URL.createObjectURL(coverFile)} alt="Cover preview" className="w-full h-20 object-cover rounded-lg border border-[#333]" />
                  <span className="text-xs text-white font-semibold mt-2 truncate max-w-[180px]">{coverFile.name}</span>
                </div>
              ) : (
                <>
                  <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <span className="text-sm text-white font-semibold">Upload Hero Cover</span>
                  <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
                </>
              )}
            </label>
          </div>

          {/* Biography */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Biography</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Write biography..."
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
              title="Add Artist"
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm"
            />
          </div>
        </form>
      </div>

      {/* 🟢 جدول خواننده‌ها */}
      <DashboardTable
        title="Artists"
        columns={tableColumns}
        data={artists}
        renderRow={(artist) => (
          <tr key={artist.id} className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors">
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <img src={artist.image} alt={artist.name} className="w-11 h-11 rounded-full object-cover bg-black shrink-0 shadow-md" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">{artist.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">ID: {artist.id}</p>
                </div>
              </div>
            </td>
            <td className="px-5 py-4 text-sm text-gray-400 font-medium">{artist.listeners}</td>
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

export default DashboardArtists;