import SocialLinks from './SocialLinks.jsx'

function Footer() {
  return (
    <>
    <div className="mx-auto my-11 w-[98%] h-[1px] bg-white/10 rounded-full"></div>

  <div className="flex mb-12 sm:mb-0 items-center sm:justify-between flex-col sm:flex-row gap-y-6 sm:gap-y-0 mx-2 text-gray-200">
    <h1 className="font-bold text-2xl sm:text-3xl tracking-tight">Contact with me</h1>
    <SocialLinks/>
  </div>
    </>
  );
}

export default Footer;
