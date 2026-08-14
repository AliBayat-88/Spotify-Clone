function AdminNotifications() {
  return (
    <button
      type="button"
      className="
        relative
        w-10 h-10
        rounded-full
        flex items-center justify-center
        text-gray-400
        hover:text-white
        hover:bg-white/[0.06]
        transition-all
      "
    >

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.7"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.31 6.022c1.733.64 3.56 1.085 5.455 1.31m5.712 0a24.255 24.255 0 0 1-5.712 0m5.712 0a3 3 0 1 1-5.712 0"
        />
      </svg>

      {/* notification dot */}
      <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#1ed760]" />

    </button>
  )
}

export default AdminNotifications