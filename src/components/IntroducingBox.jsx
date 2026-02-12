import Button from './Button.jsx'

function IntroducingBox({header , description}) {
  return (
    <div className="bg-[#404040] lg:p-4 p-2 rounded-xl mt-10">
      <h5 className="lg:text-xl font-semibold">{header}</h5>
      <span className="text-white/90 text-sm lg:text-base block mt-3 mb-3">{description}</span>
      <Button >create playlist</Button>
    </div>
  );
}

export default IntroducingBox;
