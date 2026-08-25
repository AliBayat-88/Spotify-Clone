function SingerBox({singer , singerProfile , onClick}) {
  return (
    <div onClick={onClick} className="flex cursor-pointer items-center gap-x-3 my-16 hover:bg-white/10 transition-all rounded-xl p-2">
      <img loading="lazy" className="w-20 h-20 rounded-full" src={singerProfile}/>
      <div className="flex flex-col gap-y-2.5">
        <span className="font-semibold">singer</span>
        <span className="font-black">{singer}</span>
      </div>
    </div>
  );
}

export default SingerBox;
