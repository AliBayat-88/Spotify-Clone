import { useState } from 'react';
import DashboardTable from './DashboardTable.jsx';
import TableActions from '../TableActions.jsx';
import ActionBtn from '../ActionBtn.jsx';

function DashboardPublicPlaylists() {
  const [playlistName, setPlaylistName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [coverFile, setCoverFile] = useState(null);

  // دیتای تستی پلی‌لیست‌ها
  const [playlists] = useState([
    {
      id: 1,
      name: 'Popular Right Now',
      description: 'The biggest songs everyone is listening to right now.',
      cover: '/playlistImg.webp',
      category: 'Pop',
      section: 'Popular',
    },
    {
      id: 2,
      name: 'Good For Your Mood',
      description: 'Songs for every mood and every moment.',
      cover: '/playlistImg.webp',
      category: 'Pop',
      section: 'Good For Your Mood',
    },
    {
      id: 3,
      name: 'Persian Hits',
      description: 'The latest and greatest Persian tracks.',
      cover: '/playlistImg.webp',
      category: 'Persian',
      section: 'Trending',
    },
  ]);

  const tableColumns = [
    'Playlist',
    'Category',
    'Section',
    { label: 'Actions', align: 'right' }
  ];

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ playlistName, description, categoryId, sectionId, coverFile });
  }

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-2">
      {/* هدر صفحه */}
      <div className="mb-6 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Public Playlists
        </h1>
        <p className="text-sm text-gray-400 mt-1">
          Create and manage playlists displayed across your website
        </p>
      </div>

      {/* فرم ساخت پلی‌لیست عمومی */}
      <div className="w-full bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-5 relative">
          {/* Playlist Name */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Playlist Name
            </label>
            <input
              type="text"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              placeholder="e.g. Popular Right Now"
              className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe this playlist..."
              rows={3}
              className="w-full bg-black text-white px-4 py-3 rounded-xl border border-[#262626] outline-none resize-none placeholder:text-gray-600 focus:border-white focus:ring-1 focus:ring-white transition-all text-sm leading-relaxed"
            />
          </div>

          {/* Category & Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Category
              </label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium cursor-pointer"
              >
                <option value="" disabled>Select category</option>
                <option value="1">Pop</option>
                <option value="2">Podcast</option>
                <option value="3">Persian</option>
                <option value="4">Hip Hop</option>
              </select>
            </div>

            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Section
              </label>
              <select
                value={sectionId}
                onChange={(e) => setSectionId(e.target.value)}
                className="w-full bg-black text-white px-4 py-3.5 rounded-xl border border-[#262626] outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-medium cursor-pointer"
              >
                <option value="" disabled>Select section</option>
                <option value="1">Popular</option>
                <option value="2">Good For Your Mood</option>
                <option value="3">Old In Pop</option>
                <option value="4">Trending</option>
              </select>
            </div>
          </div>

          {/* Cover Upload */}
          <div className="flex flex-col gap-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
              Playlist Cover
            </label>
            <label className="group cursor-pointer flex flex-col items-center justify-center min-h-36 rounded-xl border border-dashed border-[#383838] bg-black hover:border-[#1ed760] hover:bg-[#1ed760]/5 transition-all p-4">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => setCoverFile(e.target.files[0])}
              />
              <div className="w-10 h-10 rounded-full bg-[#222] group-hover:bg-[#1ed760] group-hover:text-black text-gray-400 flex items-center justify-center transition-all mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5V7.75A2.75 2.75 0 015.75 5h12.5A2.75 2.75 0 0121 7.75v8.5A2.75 2.75 0 0118.25 19H5.75A2.75 2.75 0 013 16.5Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3 15 4.5-4.5 3.5 3.5 2.5-2.5L21 18" />
                </svg>
              </div>
              <span className="text-sm text-white font-semibold truncate max-w-[200px]">
                {coverFile ? coverFile.name : 'Upload Cover Image'}
              </span>
              <span className="text-xs text-gray-500 mt-0.5">JPG, PNG or WEBP</span>
            </label>
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
              title="Create Playlist"
              className="bg-[#1ed760] text-black font-bold px-7 py-2.5 text-sm"
            />
          </div>
        </form>
      </div>

      {/* 🟢 جدول پلی‌لیست‌ها با DashboardTable و TableActions */}
      <DashboardTable
        title="Public Playlists"
        columns={tableColumns}
        data={playlists}
        renderRow={(playlist) => (
          <tr
            key={playlist.id}
            className="border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors"
          >
            <td className="px-5 py-4">
              <div className="flex items-center gap-3">
                <img
                  src={playlist.cover}
                  alt={playlist.name}
                  className="w-11 h-11 rounded-lg object-cover bg-black shrink-0 shadow-md"
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white truncate max-w-[200px]">
                    {playlist.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate max-w-[250px] mt-0.5">
                    {playlist.description}
                  </p>
                </div>
              </div>
            </td>

            <td className="px-5 py-4">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-gray-300">
                {playlist.category}
              </span>
            </td>

            <td className="px-5 py-4 text-sm text-gray-400 font-medium">
              {playlist.section}
            </td>

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

export default DashboardPublicPlaylists;