import { useParams } from 'react-router-dom'
import { useArtist } from '../features/useArtist.js'
import { useSongs } from '../features/useSongs.js'
import LoadingSpinner from './LoadingSpinner.jsx'
import ArtistHero from './ArtistHero.jsx'
import ArtistActions from './ArtistActions.jsx'
import SongRow from './SongRow.jsx'
import Footer from './Footer.jsx'
import { useState } from 'react'
import SeeMore from './SeeMore.jsx'
import ArtistBioDrawer from './ArtistBioDrawer.jsx'

function ArtistContainer() {
  const [isExpanded, setExpanded] = useState(true)
  const [isBioOpen, setIsBioOpen] = useState(false) // 🟢 ۲. استیت کنترل کشو
  const { id } = useParams()

  const { songs, isLoading: isLoadingSongs } = useSongs()
  const { artist, isLoading: isLoadingArtist } = useArtist(id)

  const showSongs = songs?.filter(song => String(song?.artists?.id) === String(id))
  const slicedSongs = isExpanded ? showSongs?.slice(0, 1) : showSongs?.slice(0, 6)

  function handleExpand() {
    setExpanded(!isExpanded)
  }

  if (isLoadingArtist || isLoadingSongs) return <LoadingSpinner />

  return (
    <div className="text-white w-full child:p-4 sm:child:pb-16 lg:child:pb-24 relative">
      <ArtistHero artistName={artist?.name} artistBackImg={artist?.image_url} backColor="bg-[#1F1FDE]"/>

      <div className="bg-[#171717]/70 backdrop-blur-xl border-t border-white/10 rounded-t-2xl absolute sm:top-[230px] lg:top-[275px] w-full">
        <ArtistActions songs={showSongs} artistId={artist?.id} onOpenBio={() => setIsBioOpen(true)} />

        <div className="mt-20">
          <div>
            <span className="block text-white font-bold text-xl sm:text-3xl my-3">Popular</span>
          </div>

          {slicedSongs?.map((song, index) => {
            return (
              <SongRow
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
          <Footer/>
        </div>
      </div>

      <ArtistBioDrawer
        artist={artist}
        isOpen={isBioOpen}
        onClose={() => setIsBioOpen(false)}
      />
    </div>
  );
}

export default ArtistContainer;