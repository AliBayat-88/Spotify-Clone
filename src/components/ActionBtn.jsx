function ActionBtn({
  onClick,
  type = "button",
  title,
  disabled,
  className = "bg-white text-black text-sm lg:text-base px-6 py-2.5"
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        font-bold rounded-full transition-all duration-200 cursor-pointer shadow-md 
        hover:scale-105 active:scale-[0.98] focus:outline-none
        ${className}
      `}
    >
      {title}
    </button>
  );
}

export default ActionBtn;