import Logo from './Logo.jsx'
import SearchBox from './SearchBox.jsx'

function Header() {
  return (
    <div className="flex justify-between items-center mt-1 mb-1.5">
      <Logo/>
      <SearchBox/>
    </div>
  );
}

export default Header;
