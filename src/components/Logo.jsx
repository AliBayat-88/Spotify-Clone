import { Link } from 'react-router-dom'

function Logo({size}) {
  return (
    <Link to="/">
      <img className={`w-${size}`} src="/spotifyLogo.png" alt="logo" />
    </Link>
  );
}

export default Logo;
