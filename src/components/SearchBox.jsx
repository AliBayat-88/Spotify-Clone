import HomeIcon from './HomeIcon.jsx'
import Button from './Button.jsx'

function SearchBox() {
  return (
    <>

      <div className="flex justify-between items-center">
        <div className="hidden md:block">

        <HomeIcon />
        </div>
        <div className="relative hidden md:block">
          <input
            type="text"
            placeholder="Search for the song..."
            className="

            bg-[#403E3E]
            rounded-2xl
            p-2.5 pl-11 pr-28
            text-white placeholder-gray-400
            focus:outline-none
            focus:ring-2 focus:ring-white
            transition-all duration-200
          "
          />

          {/* Search icon */}
          <img
            src="/search.svg"
            className="absolute cursor-pointer left-3 top-1/2 -translate-y-1/2"
            alt="Search"
          />

          {/* Divider */}
          <span className="absolute right-10 top-1/2 -translate-y-1/2 h-6 w-px bg-white/40" />

          {/* Browse icon */}
          <img
            src="/browse.svg"
            className="absolute cursor-pointer right-3 top-1/2 -translate-y-1/2"
            alt="Browse"
          />
        </div>
      </div>


    {/* sign up & signIn */}
      <div className="flex justify-center items-center gap-2.5">
        <Button>Sign up</Button>
        <div className="hidden md:block">
          <Button icon="arrow.svg">Login</Button>
        </div>

      </div>

    </>
  );
}

export default SearchBox;
