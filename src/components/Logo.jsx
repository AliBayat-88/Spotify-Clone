import PhoneSearchBox from './PhoneSearchBox.jsx'

function Logo() {
  return (
    <div className="flex items-center">
      <img className="w-14" src="spotifyLogo.png" alt="logo" />
      <div className="md:hidden block">
        <PhoneSearchBox/>
      </div>
    </div>
  );
}

export default Logo;
