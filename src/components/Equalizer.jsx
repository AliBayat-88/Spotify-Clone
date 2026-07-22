import React from 'react';

function Equalizer({ isPlaying }) {
  // حذف کلاس‌های ترنزیشن مزاحم برای اجرای روان انیمیشن
  const barClass = "w-[3px] h-full bg-[#1ed760] rounded-full origin-bottom";

  return (
    <div className="flex items-end justify-center gap-[3px] w-5 h-5">

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes equalize {
          0%, 100% { transform: scaleY(0.2); }
          50% { transform: scaleY(1); }
        }
        .animate-equalize {
          animation: equalize 1s infinite ease-in-out;
        }
      `}} />

      {/* ستون اول */}
      <div
        className={`${barClass} ${isPlaying ? 'animate-equalize' : 'scale-y-[0.3] transition-transform duration-300'}`}
        style={{ animationDuration: '0.6s', animationDelay: '0.0s' }}
      />

      {/* ستون دوم */}
      <div
        className={`${barClass} ${isPlaying ? 'animate-equalize' : 'scale-y-[0.6] transition-transform duration-300'}`}
        style={{ animationDuration: '0.9s', animationDelay: '0.2s' }}
      />

      {/* ستون سوم */}
      <div
        className={`${barClass} ${isPlaying ? 'animate-equalize' : 'scale-y-[0.4] transition-transform duration-300'}`}
        style={{ animationDuration: '0.7s', animationDelay: '0.1s' }}
      />

      {/* ستون چهارم */}
      <div
        className={`${barClass} ${isPlaying ? 'animate-equalize' : 'scale-y-[0.8] transition-transform duration-300'}`}
        style={{ animationDuration: '0.8s', animationDelay: '0.3s' }}
      />

    </div>
  );
}

export default Equalizer;