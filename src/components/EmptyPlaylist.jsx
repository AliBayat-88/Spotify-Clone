import React from 'react';
import Button from './Button.jsx';

function EmptyPlaylist({ type = 'user' }) {
  const isPublic = type === 'public';

  const content = isPublic
    ? {
      title: 'This playlist is currently empty',
      description: 'No tracks have been added here yet. Check back later or discover new tracks across categories.',
      btnText: 'Explore music',
      btnLink: '/search',
    }
    : {
      title: "It's feeling a little empty here",
      description: "Let's find some songs, artists, or podcasts for this playlist to get you started.",
      btnText: 'Find songs',
      btnLink: '/search',
    };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center select-none">
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-spotify-elevated border border-white/10 rounded-full flex items-center justify-center mb-5 text-spotify-muted shadow-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-8 h-8 sm:w-10 sm:h-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m9 9 10.5-3m0 0L21 18m-1.5-12v12.75A2.25 2.25 0 0 1 17.25 21a2.25 2.25 0 0 1-2.25-2.25V12m-6 3V3.75A2.25 2.25 0 0 0 6.75 1.5 2.25 2.25 0 0 0 4.5 3.75v12.75a2.25 2.25 0 0 0 2.25 2.25A2.25 2.25 0 0 0 9 16.5zm12-9a2.25 2.25 0 0 0-2.25-2.25 2.25 2.25 0 0 0-2.25 2.25"
          />
        </svg>
      </div>

      <h3 className="text-lg sm:text-xl font-bold text-white mb-2 tracking-tight">
        {content.title}
      </h3>
      <p className="text-spotify-muted text-xs sm:text-sm max-w-sm mb-6 leading-relaxed">
        {content.description}
      </p>

      <Button wherePage={content.btnLink}>{content.btnText}</Button>
    </div>
  );
}

export default React.memo(EmptyPlaylist);