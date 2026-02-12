function Button({children , icon}) {
  return (
    <div className="flex items-center justify-center">
      <div className="relative group">
        <button
          className="relative inline-block p-px font-semibold leading-6 bg-gray-800 shadow-2xl cursor-pointer rounded-xl transition-transform duration-200 ease-in-out hover:scale-105 active:scale-95"
        >
      <span
        className="absolute inset-0 rounded-xl bg-gradient-to-r from-gray-300 via-gray-500 to-gray-700 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      ></span>

          <span className="relative z-10 block lg:px-5 px-2.5 lg:py-3 py-2 rounded-xl bg-white">
        <div className="relative z-10 flex items-center space-x-1">
          <span className="transition-all lg:text-base text-sm text-black duration-500 group-hover:translate-x-1"
          >{children}</span
          >
          {icon && <img src={icon} alt="arrow"  className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"/>}

        </div>
      </span>
        </button>
      </div>
    </div>
  );
}

export default Button;
