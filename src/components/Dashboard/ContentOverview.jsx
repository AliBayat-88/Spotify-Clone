function ContentOverview() {

  const content = [
    {
      title: 'Songs',
      value: 1542,
      percentage: 72,
    },
    {
      title: 'Artists',
      value: 86,
      percentage: 48,
    },
    {
      title: 'Public Playlists',
      value: 124,
      percentage: 36,
    },
    {
      title: 'Users',
      value: 1284,
      percentage: 84,
    },
  ]

  return (
    <div className="bg-spotify-surface border border-spotify-card rounded-2xl p-5 sm:p-6">

      <div className="mb-6">

        <h2 className="text-lg font-bold">
          Content Overview
        </h2>

        <p className="text-xs text-gray-500 mt-1">
          Current content across the platform
        </p>

      </div>


      <div className="flex flex-col gap-5">

        {content.map((item) => (

          <div key={item.title}>

            <div className="flex justify-between items-center mb-2">

              <span className="text-sm text-gray-300 font-medium">
                {item.title}
              </span>

              <span className="text-sm text-white font-bold">
                {item.value.toLocaleString()}
              </span>

            </div>


            <div className="h-1.5 bg-[#282828] rounded-full overflow-hidden">

              <div
                className="
                  h-full
                  bg-spotify-green
                  rounded-full
                  transition-all
                "
                style={{
                  width: `${item.percentage}%`
                }}
              />

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default ContentOverview