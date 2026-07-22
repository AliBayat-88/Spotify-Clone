function SeeMore({onClick , isExpanded}) {
  return (
    <div onClick={onClick} className="sm:ml-10 ml-3 mt-4">
      <a href="#" className="font-semibold text-white/60 hover:text-white transition-colors text-base sm:text-lg">see {isExpanded ? "more" : "less"}</a>
    </div>
  );
}

export default SeeMore;
