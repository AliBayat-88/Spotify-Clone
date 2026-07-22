function SocialIcon({ name, children , link }) {
  return (
    <li className="relative group cursor-pointer">
      <a
        href={link}
        aria-label={name}
        className="flex items-center justify-center w-14 h-14 rounded-full
                   bg-white/5 text-gray-400 backdrop-blur-md border border-white/10
                   shadow-md transition-all duration-300 ease-out
                   hover:text-white hover:scale-110 hover:-translate-y-1
                   hover:shadow-[0_0_25px_rgba(255,255,255,0.25)]"
      >
        {children}

        <span
          className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2
                     scale-90 opacity-0 group-hover:opacity-100 group-hover:scale-100
                     transition-all duration-300
                     bg-black/80 text-white text-xs px-3 py-1 rounded-lg
                     shadow-lg backdrop-blur-md whitespace-nowrap"
        >
          {name}
        </span>
      </a>
    </li>
  );
}

export default SocialIcon;
