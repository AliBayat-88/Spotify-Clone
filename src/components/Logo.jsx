import { Link } from 'react-router-dom'

function Logo({size}) {
  return (
    <Link to="/">
      <img loading="lazy" className={`w-${size} shrink-0`} src="/spotifyLogo.png" alt="logo" />
    </Link>
  );
}

export default Logo;
