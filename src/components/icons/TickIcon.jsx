function TickIcon({size , iconSize}) {
  return (
    <div className={`flex items-center justify-center bg-spotify-green rounded-full text-black shadow-lg shadow-spotify-green/20 animate-pop ${size} shrink-0`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3.5" stroke="currentColor" className={iconSize}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
          className="animate-draw"
          style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
        />
      </svg>
    </div>
  );
}

export default TickIcon;
