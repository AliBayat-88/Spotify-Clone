import { useNavigate, useParams } from 'react-router-dom'
import { useCategory, useSectionsCategory } from '../features/useCategory.js'
import EachAlbum from './EachAlbum.jsx'
import Footer from './Footer.jsx'

const COLOR_PALETTES = [
  { bg: "bg-gradient-to-br from-purple-600 to-purple-900", shadow: "shadow-purple-900/40" },
  { bg: "bg-gradient-to-br from-pink-600 to-rose-900", shadow: "shadow-rose-900/40" },
  { bg: "bg-gradient-to-br from-orange-500 to-red-800", shadow: "shadow-red-900/40" },
  { bg: "bg-gradient-to-br from-emerald-500 to-green-900", shadow: "shadow-green-900/40" },
  { bg: "bg-gradient-to-br from-blue-600 to-indigo-900", shadow: "shadow-indigo-900/40" },
  { bg: "bg-gradient-to-br from-yellow-500 to-amber-800", shadow: "shadow-amber-900/40" },
  { bg: "bg-gradient-to-br from-teal-500 to-cyan-900", shadow: "shadow-cyan-900/40" },
  { bg: "bg-gradient-to-br from-fuchsia-600 to-purple-900", shadow: "shadow-fuchsia-900/40" },
]

function GenreContainer() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { category } = useCategory(id)
const {sections , isLoading} = useSectionsCategory(id)
  console.log(sections)

  const loadingSkeletons = Array.from({ length: 2 });
  const palette = COLOR_PALETTES[id % COLOR_PALETTES.length];

  return (
    <div className="w-full relative min-h-screen text-white select-none">
      <div
        className={`absolute top-0 left-0 right-0 h-[160px] sm:h-[320px] ${palette.bg} flex items-end p-6 sm:p-10 z-0 pointer-events-none`}
      >
        <div
          className="transition-all duration-75 will-change-transform"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight leading-none mb-4 sm:mb-6">
            {category?.name}
          </h1>
        </div>
      </div>

      <div
        className="absolute top-36 sm:top-[280px] bg-[#171717]/90 backdrop-blur-2xl border-t border-white/10 rounded-t-2xl w-full p-4 sm:p-6 shadow-[0_-15px_40px_rgba(0,0,0,0.6)] z-10"
      >

        {isLoading ? (
          loadingSkeletons.map((_, index) => (
            <EachAlbum
              key={`skeleton-section-${index}`}
              variant="slider"
              isLoading={true}
            />
          ))
        ) : sections?.map((section) => {
          return (
            <>
              <EachAlbum
                onClick={(id) => navigate(`/public-playlist/${id}`)}
                variant="slider"
                sectionId={section?.id}
                isLoading={isLoading}
                infos={section.public_playLists?.map((playlist) => ({
                  id: playlist.id,
                  img: playlist.cover_url,
                  title: playlist.title,
                  description: playlist.description,
                }))}
                isPlaylist
                headingText={section.title}
              />
            </>
          )
        })}


        <Footer/>
      </div>

    </div>

  );
}

export default GenreContainer;