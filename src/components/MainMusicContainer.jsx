import EachAlbum from './EachAlbum.jsx';
import { useNavigate } from 'react-router';
import { useHomeSection } from '../features/useHomeSection.js';
import Footer from './Footer.jsx';

function MainMusicContainer() {
  const { data: sections, isLoading } = useHomeSection();
  const navigate = useNavigate();


  const loadingSkeletons = Array.from({ length: 2 });

  return (
    <div className="relative w-full rounded-xl p-2 sm:p-5 h-full overflow-y-auto select-none bg-[#101010] scrollbar-hide">

      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-0">
        {/* گوی سبز نئونی در گوشه چپ بالا */}
        <div className="absolute -top-24 -left-20 w-96 h-96 bg-spotify-green/20 rounded-full blur-[100px] animate-pulse transition-all duration-1000" />
        {/* گوی بنفش/ایندیگو در سمت راست */}
        <div className="absolute top-10 right-0 w-80 h-80 bg-purple-900/25 rounded-full blur-[110px] animate-pulse delay-700" />
        {/* بازتاب نوری ملایم در مرکز */}
        <div className="absolute top-64 left-1/3 w-72 h-72 bg-teal-800/15 rounded-full blur-[90px]" />
      </div>

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
                bio: item.songs?.artists?.bio,
                audio_url: item.songs?.audio_url,
              };
            } else {
              return {
                id: item.artists?.id,
                name: item.artists?.name,
                img: item.artists?.image_url,
                bio: item.artists?.bio,
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