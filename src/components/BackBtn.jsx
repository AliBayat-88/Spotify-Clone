import { useNavigate } from 'react-router'

function BackBtn() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  };

  return (
    <button
      onClick={() => handleBack()}
      className="absolute -top-4 left-0 text-neutral-400 hover:text-white flex items-center gap-1 text-sm font-semibold transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
      Back
    </button>
  );
}

export default BackBtn;