import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCategory, useSectionsCategory } from '../features/useCategory.js';
import EachAlbum from './EachAlbum.jsx';
import Footer from './Footer.jsx';

const COLOR_PALETTES = [
  { bg: 'from-purple-700 to-spotify-base', glow: 'bg-purple-600/30' },
  { bg: 'from-rose-700 to-spotify-base', glow: 'bg-rose-600/30' },
  { bg: 'from-amber-600 to-spotify-base', glow: 'bg-amber-600/30' },
  { bg: 'from-emerald-700 to-spotify-base', glow: 'bg-emerald-600/30' },
  { bg: 'from-blue-700 to-spotify-base', glow: 'bg-blue-600/30' },
  { bg: 'from-teal-700 to-spotify-base', glow: 'bg-teal-600/30' },
  { bg: 'from-fuchsia-700 to-spotify-base', glow: 'bg-fuchsia-600/30' },
  { bg: 'from-indigo-700 to-spotify-base', glow: 'bg-indigo-600/30' },
];

function GenreContainer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { category } = useCategory(id);
  const { sections, isLoading } = useSectionsCategory(id);

  const numericId = Number(id) || id?.charCodeAt(0) || 0;
  const palette = COLOR_PALETTES[Math.abs(numericId) % COLOR_PALETTES.length];

  return (
    <div className="w-full relative min-h-screen text-white select-none bg-spotify-base rounded-xl overflow-hidden">
      <div className={`relative w-full min-h-[220px] sm:min-h-[280px] bg-gradient-to-b ${palette.bg} p-6 sm:p-10 flex flex-col justify-end overflow-hidden`}>
        <div className={`absolute -top-16 -left-16 w-80 h-80 ${palette.glow} rounded-full blur-[100px] pointer-events-none transform-gpu`} />

        <div className="relative z-10">
          <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-white/80">
            Category
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mt-2 drop-shadow-xl">
            {category?.name || '...'}
          </h1>
        </div>
      </div>

      <div className="relative bg-spotify-base px-4 sm:px-8 py-6 flex flex-col gap-y-6 border-t border-white/[0.06] shadow-[0_-16px_36px_rgba(0,0,0,0.7)] z-10">
        {isLoading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <EachAlbum
              key={`genre-skeleton-${index}`}
              variant="slider"
              isLoading={true}
            />
          ))
        ) : (
          sections?.map((section) => (
            <EachAlbum
              key={section.id}
              onClick={(playlistId) => navigate(`/public-playlist/${playlistId}`)}
              variant="slider"
              sectionId={section?.id}
              isLoading={isLoading}
              isPlaylist = {Boolean(section?.public_playLists)}
              headingText={section.title}
              infos={section.public_playLists?.map((playlist) => ({
                id: playlist.id,
                img: playlist.cover_url,
                title: playlist.title,
                description: playlist.description,
              }))}
            />
          ))
        )}

        <Footer />
      </div>
    </div>
  );
}

export default GenreContainer;