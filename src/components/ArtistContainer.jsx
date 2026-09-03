// src/components/ArtistContainer.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useArtist } from '../features/useArtist.js';
import { useSongsByArtist } from '../features/useSongsById.js';
import LoadingSpinner from './LoadingSpinner.jsx';
import ArtistHero from './ArtistHero.jsx';
import ArtistActions from './ArtistActions.jsx';
import SongRow from './SongRow.jsx';
import Footer from './Footer.jsx';
import SeeMore from './SeeMore.jsx';
import ArtistBioDrawer from './ArtistBioDrawer.jsx';

function ArtistContainer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isBioOpen, setIsBioOpen] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { artist, isLoading: isLoadingArtist } = useArtist(id);
  const { songsByArtist, isLoading: isLoadingSongs } = useSongsByArtist(id);

  if (isLoadingArtist || isLoadingSongs) {
    return (
      <div className="w-full py-32 flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const displayedSongs = !isExpanded
    ? songsByArtist
    : songsByArtist?.slice(0, 3);

  return (
    <div className="w-full text-white bg-spotify-base rounded-xl overflow-hidden select-none">
      {/* بخش هیرو */}
      <ArtistHero
        artistName={artist?.name}
        artistBackImg={artist?.image_url}
        isVerified={true}
      />

      {/* بدنه محتوا با تفکیک نرم و سایه */}
      <div className="relative bg-gradient-to-b from-[#161616] via-[#131313] to-spotify-base px-4 sm:px-8 py-6 flex flex-col gap-y-6 border-t border-white/[0.08] shadow-[0_-16px_36px_rgba(0,0,0,0.6)] z-20">

        {/* نوار دکمه پلی بزرگ، فالو و باز کردن بیو */}
        <ArtistActions
          songs={songsByArtist}
          artistId={artist?.id}
          onOpenBio={() => setIsBioOpen(true)}
        />

        {/* جدول آهنگ‌های پرطرفدار */}
        <div className="flex flex-col gap-y-3 mt-4">
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Popular
          </h2>

          <div className="flex flex-col divide-y divide-white/[0.04]">
            {displayedSongs?.map((song, index) => (
              <SongRow
                key={song.id || index}
                index={index + 1}
                song={song}
                singer={artist?.name}
                play={song.play_count}
                onClick={() => navigate(`/track/${song.id}`)}
              />
            ))}
          </div>

          {songsByArtist?.length > 3 && (
            <div className="pt-2 flex justify-start">
              <SeeMore
                isExpanded={isExpanded}
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            </div>
          )}
        </div>

        <Footer />
      </div>

      {/* دراور بایوگرافی خواننده */}
      <ArtistBioDrawer
        artist={artist}
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
      />
    </div>
  );
}

export default ArtistContainer;