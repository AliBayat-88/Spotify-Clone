import EachAlbum from './EachAlbum.jsx'
import SocialLinks from './SocialLinks.jsx'

function MainMusicContainer() {
  return (
    <div className="relative bg-[#171717] w-full rounded-xl p-2 sm:p-5 h-full overflow-y-auto">
      <EachAlbum
        songs={Array.from({ length: 10 }).map((_, index) => ({
          id: index,
          title: `Song Title ${index + 1}`,
          artist: `Artist Name ${index + 1}`,
          img: "I Had Some Help (Feat_ Morgan Wallen).jpeg"
        }))}
        headingText="Trending musics"
      />

      <EachAlbum
        songs={Array.from({ length: 10 }).map((_, index) => ({
          id: index,
          title: `Song Title ${index + 1}`,
          artist: `Artist Name ${index + 1}`,
          img: "Pink Pony Club - Chappell Roan_ Song Lyrics, Music Videos & Concerts.jpeg"
        }))}
        headingText="Popular artists"
      />


      {/* Divider */}
      <div className="mx-auto mt-10 mb-16 w-[95%] h-[1px] bg-white/40 rounded-full"></div>

      {/* Social Icons */}
      <div className="flex items-center sm:justify-between flex-col sm:flex-row gap-y-8 sm:gap-y-0 mx-4">
        <h1 className="font-black text-3xl">Contact with me</h1>
        <SocialLinks/>
      </div>
    </div>
  );
}

export default MainMusicContainer;
