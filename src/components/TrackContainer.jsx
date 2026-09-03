import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSong } from '../features/useSong.js';
import { useSongsByArtist } from '../features/useSongsById.js';
import TrackHero from './TrackHero.jsx';
import TrackActions from './TrackActions.jsx';
import LyricsSection from './LyricsSection.jsx';
import SingerBox from './SingerBox.jsx';
import SongRow from './SongRow.jsx';
import EachAlbum from './EachAlbum.jsx';
import LoadingSpinner from './LoadingSpinner.jsx';
import Footer from './Footer.jsx';
import SeeMore from './SeeMore.jsx';

function TrackContainer() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const { song, isLoading } = useSong(id);
  const { songsByArtist, isLoading: isLoadingArtistSongs } = useSongsByArtist(song?.artists?.id);

  if (isLoading || isLoadingArtistSongs) {
    return (
      <div className="w-full min-h-[90vh] flex justify-center items-center">
        <LoadingSpinner />
      </div>
    );
  }

  const trackQueue = (() => {
    if (!songsByArtist || !song) return song ? [song] : [];
    const exists = songsByArtist.some((s) => Number(s.id) === Number(song.id));
    return exists ? songsByArtist : [song, ...songsByArtist];
  })();

  const displayedTracks = isExpanded
    ? songsByArtist
    : songsByArtist?.slice(0, 5);

  const moreSongs = songsByArtist?.filter(
    (artistSong) => Number(artistSong.id) !== Number(song?.id)
  );

  return (
    <div className="w-full text-white bg-spotify-base rounded-xl overflow-hidden select-none">
      <TrackHero
        songName={song?.name}
        songPoster={song?.cover_url}
        singer={song?.artists?.name}
        artistId={song?.artists?.id}
        artistImg={song?.artists?.image_url}
        duration={song?.duration}
        type="Song"
      />

      <div className="relative px-4 sm:px-8 py-6 flex flex-col gap-y-8 z-10">
        <TrackActions queue={trackQueue} audioUrl={song?.audio_url} song={song} />

        {song?.lyrics && <LyricsSection lyrics={song?.lyrics} />}

        <SingerBox
          onClick={() => navigate(`/artist/${song?.artists?.id}`)}
          singer={song?.artists?.name}
          singerProfile={song?.artists?.image_url}
          bio={song?.artists?.bio}
        />

        <div className="flex flex-col gap-y-3">
          <div>
            <span className="text-xs font-bold text-spotify-subtext uppercase tracking-wider">
              Popular Tracks by
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
              {song?.artists?.name}
            </h3>
          </div>

          <div className="flex flex-col divide-y divide-white/[0.04]">
            {displayedTracks?.map((item, index) => (
              <SongRow
                key={item.id}
                index={index + 1}
                song={item}
                singer={song?.artists?.name}
                onClick={() => navigate(`/track/${item.id}`)}
              />
            ))}
          </div>

          {songsByArtist?.length > 5 && (
            <div className="pt-2 flex justify-start">
              <SeeMore
                isExpanded={isExpanded}
                onClick={() => setIsExpanded((prev) => !prev)}
              />
            </div>
          )}
        </div>

        {moreSongs?.length > 0 && (
          <div className="pt-4">
            <EachAlbum
              className="pl-0"
              variant="responsive"
              onClick={(trackId) => navigate(`/track/${trackId}`)}
              headingText={`More by ${song?.artists?.name}`}
              infos={moreSongs.map((item) => ({
                id: item.id,
                name: item.name,
                title: item.name,
                img: item.cover_url,
                cover_url: item.cover_url,
                audio_url: item.audio_url,
                song_url: item.audio_url,
                duration: item.duration,
                artist: song?.artists?.name,
                artists: song?.artists,
              }))}
            />
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
}

export default TrackContainer;