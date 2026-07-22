import Logo from './Logo.jsx'
import SearchBox from './SearchBox.jsx'
import PhoneSearchBox from './PhoneSearchBox.jsx'

function Header() {
  return (
    <div className="flex justify-between items-center m-1.5 mr-2.5">
      <div className="flex items-center">
      <Logo size="14"/>
        <div className="md:hidden block">
          <PhoneSearchBox/>
        </div>
      </div>
      <SearchBox/>
    </div>
  );
}

export default Header;
