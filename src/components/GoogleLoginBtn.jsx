function GoogleLoginBtn({onClick}) {
  return (
    <div onClick={onClick} className="flex justify-center w-full">
      <button
        type="button"
        className="w-full flex items-center justify-center gap-2 sm:gap-3 bg-black hover:bg-white/5 border border-[#282828] hover:border-gray-500 text-white font-bold py-3.5 px-4 rounded-full transition-all duration-300 active:scale-[0.98] group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
          className="w-5 h-5 flex-shrink-0"
        >
          <g fillRule="evenodd" strokeWidth="1" stroke="none" fill="none">
            <g fillRule="nonzero" transform="translate(3.000000, 2.000000)">
              <path
                fill="#4285F4"
                d="M57.812 30.152c0-2.425-.197-4.195-.623-6.03H29.496v10.946h16.255c-.327 2.72-2.097 6.817-6.03 9.57l-.055.366 8.756 6.784.607.06c5.571-5.145 8.783-12.716 8.783-21.696"
              />
              <path
                fill="#34A853"
                d="M29.496 58.992c7.964 0 14.65-2.622 19.533-7.145L39.721 44.637c-2.49 1.737-5.833 2.95-10.225 2.95-7.8 0-14.42-5.145-16.78-12.257l-.346.03-9.105 7.046-.119.33c4.85 9.636 14.813 16.256 26.35 16.256"
              />
              <path
                fill="#FBBC05"
                d="M12.716 35.33c-.623-1.835-.983-3.802-.983-5.834 0-2.032.36-3.998.95-5.833l-.016-.39-9.22-7.16-.301.144C1.147 20.254 0 24.744 0 29.496c0 4.752 1.147 9.242 3.146 13.24l9.57-7.406"
              />
              <path
                fill="#EB4335"
                d="M29.496 11.405c5.538 0 9.274 2.393 11.405 4.392l8.324-8.128C44.113 2.917 37.46 0 29.496 0 17.96 0 7.996 6.62 3.146 16.255l9.537 7.407c2.393-7.112 9.013-12.257 16.813-12.257"
              />
            </g>
          </g>
        </svg>

        <span className="text-sm tracking-tight transition-colors duration-300">
          Continue with Google
        </span>
      </button>
    </div>
  );
}

export default GoogleLoginBtn;