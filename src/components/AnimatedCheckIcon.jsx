import React from 'react';

function AnimatedCheckIcon({ size }) {
  const isBig = size === "big";
  const paddingClass = isBig ? "p-2" : "p-1";
  const svgSizeClass = isBig ? "w-6 h-6" : "w-4 h-4";

  return (
    <div
      className={`
        flex items-center justify-center cursor-pointer bg-[#1ed760] rounded-full text-black shadow-lg shadow-[#1ed760]/20
        animate-[pop_0.3s_cubic-bezier(0.175,0.885,0.32,1.275)]
        ${paddingClass}
      `}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="3.5"
        stroke="currentColor"
        className={svgSizeClass}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m4.5 12.75 6 6 9-13.5"
          className="animate-[draw_0.4s_ease-in-out_0.15s_forwards]"
          style={{ strokeDasharray: 50, strokeDashoffset: 50 }}
        />
      </svg>

      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes pop {
          0% {
            transform: scale(0.6);
            opacity: 0;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default AnimatedCheckIcon;