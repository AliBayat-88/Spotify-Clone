import React from 'react';

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center w-full h-full min-h-[150px]">
      <div className="relative flex items-center justify-start w-11 h-11 animate-spin [animation-duration:1.2s]">

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[1] before:shadow-[0_0_12px_#1ed760]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[45deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.85]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[90deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.7]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[135deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.55]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[180deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.4]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[225deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.25]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[270deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.15]"></div>

        <div className="absolute top-0 left-0 flex items-center justify-start w-full h-full rotate-[315deg] before:content-[''] before:h-[20%] before:w-[20%] before:rounded-full before:bg-spotify-green before:opacity-[0.05]"></div>

      </div>
    </div>
  );
}

export default LoadingSpinner;