import { Link } from 'react-router-dom'

function HaveAccount({ textState, questionState, to }) {
  return (
    <div className="flex flex-col items-center gap-y-4 mt-4 text-lg">
      <span className="text-white/60 font-semibold">
        {questionState}
      </span>

      <Link
        to={to}
        className="font-bold hover:text-white/75 transition-all"
      >
        {textState}
      </Link>
    </div>
  );
}
export default HaveAccount;