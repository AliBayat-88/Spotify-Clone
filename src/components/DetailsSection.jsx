import { useParams, useNavigate } from 'react-router-dom'; // 👈 اضافه شدن useNavigate
import BoxSong from './BoxSong.jsx';
import { useSectionDetails } from '../features/useSectionDetails.js';
import LoadingSpinner from './LoadingSpinner.jsx'

function DetailsSection() {
  const { id } = useParams();
  const { data, isLoading } = useSectionDetails(id);
  const navigate = useNavigate(); // 👈 راه‌اندازی هوک مسیریابی

  if (isLoading) return <LoadingSpinner/>;

  // منطق استخراج آیتم‌ها
  let items = [];

  if (data.type === 'playlist') {
    items = data.public_playLists || [];
  } else {
    items = data.section_items?.map(item => {
      if (data.type === 'song') return item.songs;
      if (data.type === 'artist') return item.artists;
      return null;
    }).filter(Boolean) || [];
  }

  // 🟢 یک تابع تمیز برای مدیریت کلیک‌ها می‌نویسیم
  const handleItemClick = (itemId) => {
    if (data.type === 'song') {
      navigate(`/track/${itemId}`);
    } else if (data.type === 'artist') {
      navigate(`/artist/${itemId}`);
    } else if (data.type === 'playlist') {
      // فرض بر اینه که روت پلی‌لیست‌های پروژه‌ات این شکلیه
      navigate(`/playlist/${itemId}`);
    }
  };

  return (
    <div className="w-full min-h-full bg-[#171717] p-4 sm:p-6 text-white pb-24">
      <h1 className="text-2xl sm:text-4xl font-black mb-6 mt-4">
        {data.title}
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
        {items?.map((item) => (
          <div key={item.id} className="h-full">
            <BoxSong
              info={{
                title: item.title || item.name,
                img: item.cover_url || item.cover || item.image_url,
                description: item.description,
                artist: item.artist_name || item.artists?.name
              }}
              isArtist={data.type === 'artist'}
              isPlaylist={data.type === 'playlist'}
              // 🟢 اینجا تابع رو صدا می‌زنیم و آیدی آیتم رو بهش می‌دیم
              onClick={() => handleItemClick(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DetailsSection;