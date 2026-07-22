import { useState } from 'react'

function LyricsSection({lyrics}) {
  const [expand , setExpand] = useState(false)

  const displayText = expand ? lyrics : `${lyrics.slice(0, 170)}...`;
  return (
    <div className="my-12">
      <h4 className="text-2xl font-bold mt-5">Lyrics</h4>
      <p className="text-gray-400 font-medium whitespace-pre-line my-5">
        {displayText}

        <span onClick={() => setExpand(!expand)} className="text-white font-semibold cursor-pointer">{expand ? "show less" : "show more"}</span>
      </p>
    </div>
  );
}

export default LyricsSection;
