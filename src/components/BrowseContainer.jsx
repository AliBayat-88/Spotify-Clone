import HeadingText from './HeadingText.jsx'
import BrowseAlbum from './BrowseAlbum.jsx'
import { useCategories } from '../features/useCategories.js'
import LoadingSpinner from './LoadingSpinner.jsx'
import { useNavigate } from 'react-router'

function BrowseContainer() {
  const { categories, isLoading } = useCategories();
  const navigate= useNavigate()

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="relative bg-gradient-to-b from-[#1f1f1f] to-[#171717] w-full rounded-xl p-3.5 sm:p-6 h-full overflow-y-auto">
      <HeadingText>Browse all</HeadingText>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8">
        {categories?.map((category, index) => (
          <BrowseAlbum
            key={index}
            onClick={() => navigate(`/genre/${category?.id}`)}
            colorIndex={category?.id}
            img={category?.image_url}
            name={category?.name}
          />
        ))}
      </div>
    </div>
  );
}



export default BrowseContainer;
