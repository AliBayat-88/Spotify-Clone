

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

function BrowseAlbum({ colorIndex, img, name , onClick }) {
  const palette = COLOR_PALETTES[colorIndex % COLOR_PALETTES.length];

  return (
    <div onClick={ onClick}
      className={`group relative ${palette.bg} ${palette.shadow} cursor-pointer w-full h-52 p-4 rounded-xl overflow-hidden transition-all duration-300 ease-out hover:scale-[1.03] hover:shadow-2xl active:scale-100`}
    >
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />

      <h3 className="relative font-black text-2xl sm:text-3xl text-white drop-shadow-lg z-10 line-clamp-2">
        {name}
      </h3>

      <div className="absolute right-[-12px] bottom-[-8px] rotate-[25deg] transition-transform duration-500 ease-out group-hover:rotate-[35deg] group-hover:translate-y-[-4px]">
        <img
          src={img}
          alt={name}
          className="w-32 h-40 rounded-lg shadow-2xl object-cover"
        />
      </div>
    </div>
  );
}

export default BrowseAlbum;