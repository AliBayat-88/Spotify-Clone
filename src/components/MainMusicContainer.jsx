import EachAlbum from './EachAlbum.jsx';
import { useNavigate } from 'react-router';
import { useHomeSection } from '../features/useHomeSection.js';
import Footer from './Footer.jsx';

function MainMusicContainer() {
  const { data: sections, isLoading } = useHomeSection();
  const navigate = useNavigate();


  const loadingSkeletons = Array.from({ length: 2 });

  return (
    <div className="relative w-full rounded-xl p-2 sm:p-5 h-full overflow-y-auto select-none bg-[#121212] bg-gradient-to-b from-[#1e3224] via-[#121212]/90 to-[#121212] bg-[length:100%_500px] bg-no-repeat scrollbar-hide">

      {isLoading ? (
        loadingSkeletons.map((_, index) => (
          <EachAlbum
            key={`skeleton-section-${index}`}
            variant="slider"
            isLoading={true}
          />
        ))
      ) : (
        sections?.map((section) => {
          const isSongType = section.type === "song";

          const formattedInfos = section.section_items?.map((item) => {
            if (isSongType) {
              return {
                id: item.songs?.id,
                name: item.songs?.name,
                img: item.songs?.cover_url,
                artist: item.songs?.artists?.name,
              };
            } else {
              return {
                id: item.artists?.id,
                name: item.artists?.name,
                img: item.artists?.image_url,
              };
            }
          }).filter(Boolean) || [];

          return (
            <EachAlbum
              key={section.id}
              variant="slider"
              sectionId={section.id}
              isLoading={isLoading}
              headingText={section.title}
              isArtist={section.type === "artist"}
              infos={formattedInfos}
              onClick={(itemId) =>
                navigate(isSongType ? `/track/${itemId}` : `/artist/${itemId}`)
              }
            />
          );
        })
      )}

      <Footer />
      <div className="sm:mb-16"></div>
    </div>
  );
}

export default MainMusicContainer;