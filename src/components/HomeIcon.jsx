import { Link } from 'react-router-dom'

function HomeIcon() {
  return (
    <Link to="/" className="p-2.5 rounded-full cursor-pointer flex mr-2 justify-center bg-[#262626]">
      <img className="" src="/home.svg" alt="logo" />
    </Link>
  );
}

export default HomeIcon;
