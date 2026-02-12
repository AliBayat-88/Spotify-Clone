import IntroducingBox from './IntroducingBox.jsx'

function SideBar() {
  return (
    <div className="hidden shrink-0 md:block w-[28%] xl:w-[23%] bg-[#171717] p-5 h-full rounded-xl text-white">
      <div className="flex items-center justify-between mb-5">
        <span className="text-base lg:text-lg font-semibold">Your library</span>

        <a className="inline-flex justify-center items-center gap-1 lg:px-3.5 px-2.5 py-2 rounded-xl bg-[#3B3A3A] cursor-pointer hover:bg-[#2B2A2A] transition">
          <img className="lg:w-5 w-4" src="plus.svg" />
          create
        </a>
      </div>

      <IntroducingBox
        header="Create your first playlist"
        description="It is easy, we will help you"
      />
      <IntroducingBox
        header="Let's find some podcasts to follow"
        description="We will keep you updated on new episodes"
      />
    </div>
  );
}

export default SideBar;
