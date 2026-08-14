import TrackHero from './TrackHero.jsx'
import TrackActions from './TrackActions.jsx'
import LyricsSection from './LyricsSection.jsx'
import SingerBox from './SingerBox.jsx'
import SongRow from './SongRow.jsx'
import EachAlbum from './EachAlbum.jsx'
import { useParams } from 'react-router-dom'
import { useSong } from '../features/useSong.js'
import { useSongsByArtist } from '../features/useSongsById.js'
import LoadingSpinner from './LoadingSpinner.jsx'
import Footer from './Footer.jsx'
import { useArtist } from '../features/useArtist.js'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import SeeMore from './SeeMore.jsx'

function TrackContainer() {
  const [isExpanded, setExpanded] = useState(true)

  const {id} = useParams()
  const navigate = useNavigate()
  const {song , isLoading} = useSong(id)
  const { artist, isLoadingArtist  } = useArtist(id)




const {songsByArtist} = useSongsByArtist(song?.artists?.id)

  const slicedSongs = isExpanded ? songsByArtist?.slice(0,1) : songsByArtist?.slice(0 , 6)


  const moreSongs = songsByArtist?.filter(
    (artistSong) => artistSong.id !== song?.id
  );

  function handleExpand() {
    setExpanded(!isExpanded)
  }

  if(isLoading || isLoadingArtist) return <LoadingSpinner/>

  return (
    <div className="text-white w-full child:p-4 sm:child:pb-16 lg:child:pb-28 relative">
      <TrackHero singer={song?.artists?.name} type="song" songName={song?.name} songPoster={song?.cover_url} backColor="bg-[#1F1FDE]"/>
      <div className="bg-[#171717]/70 backdrop-blur-xl border-t border-white/10 rounded-t-2xl absolute sm:top-[230px] lg:top-[275px] w-full">
        <TrackActions songs={songsByArtist} songName={song?.name} audioUrl={song?.audio_url} song={song}/>
        <LyricsSection lyrics={song?.lyrics} />

        <SingerBox onClick={() => navigate(`/artist/${song?.artists?.id}`)} singer={song?.artists?.name} singerProfile={song?.artists?.image_url} />
        <div>
          <span className="text-gray-400">pupilar songs by</span>
        </div>
        <div>
          <span className="block text-white font-bold text-xl sm:text-3xl my-3">{song?.artists.name}</span>
        </div>
        {slicedSongs?.map((song, index) => {
          return (
            <SongRow
              onClick={() => navigate(`/track/${song?.id}`)}
              key={song.id || index}
              type="song"
              singer={artist?.name}
              play={224242}
              index={index + 1}
              song={song}
            />
          )
        })}
        <SeeMore isExpanded={isExpanded} onClick={() => handleExpand()}/>
        <div>
          <div className="mt-12">
            <EachAlbum className="pl-0" variant="responsive" onClick={(id) => navigate(`/track/${id}`)} headingText={`More by ${song?.artists?.name}`} infos={moreSongs?.map((song) => ({
                id: song.id,
                name: song.name,
                img: song.cover_url,
                artist:song.artists?.name

              }))} />
          </div>
          <Footer/>

        </div>
      </div>
    </div>
  );
}

export default TrackContainer;
