import ActionBtn from './ActionBtn.jsx'

function IntroducingBox({ header, description , onClick }) {
  return (
    <div className="bg-[#181818] border border-[#282828] hover:border-[#3e3e3e] lg:p-6 p-4 rounded-xl mt-8 transition-colors duration-300 select-none shadow-lg">
      <h5 className="text-white lg:text-xl text-lg font-bold tracking-tight">
        {header}
      </h5>

      <p className="text-[#a7a7a7] text-sm lg:text-base font-medium mt-2 mb-5 leading-relaxed">
        {description}
      </p>

      <ActionBtn title="Create playList" onClick={onClick} />
    </div>
  );
}

export default IntroducingBox;