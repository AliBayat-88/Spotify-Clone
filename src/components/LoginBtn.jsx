function LoginBtn({ children , disabled }) {

  return (
    <button type="submit"
      disabled={disabled}
      className="relative flex w-full py-2 overflow-hidden font-semibold transition-all bg-emerald-500 rounded-xl group disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-emerald-500">
      <span
        className="absolute bottom-0 left-0 w-full h-full transition-all duration-200 ease-in-out delay-100 -translate-x-full bg-emerald-700 rounded-md group-hover:translate-x-0 group-disabled:!translate-x-full"
      ></span>
      <span
        className="relative w-full font-black text-center text-black transition-colors duration-200 ease-in-out group-hover:text-white group-disabled:group-hover:text-black"
      >{children}</span>
    </button>
  );
}

export default LoginBtn;