import LoadingSpinner from '../LoadingSpinner.jsx'

function DashboardTable({
  title = 'Items',
  count,
  isLoading,
  columns = [], // مثال: ['Song', 'Artist', 'Duration', { label: 'Actions', align: 'right' }]
  data = [],
  renderRow,
  emptyError= "there is no items.",
}) {
  console.log(data)

  const totalCount = count !== undefined ? count : data.length;

  return (
    <div className="mt-10 bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden shadow-xl">
      {/* هدر جدول */}
      <div className="p-5 sm:p-6 border-b border-white/5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-white">{title}</h2>
          <p className="text-xs text-gray-400 mt-0.5">Manage {title.toLowerCase()} in your library</p>
        </div>

        <span className="text-xs font-bold text-gray-400 bg-black border border-[#262626] px-3.5 py-1.5 rounded-full self-start sm:self-auto">
          {totalCount} {title}
        </span>
      </div>

      {/* محتوای واکنش‌گرا و اسکرول‌پذیر جدول */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[650px] text-left border-collapse">
          <thead>
          <tr className="border-b border-white/5 bg-black/20">
            {columns.map((col, index) => {
              const isObj = typeof col === 'object';
              const label = isObj ? col.label : col;
              const align = isObj && col.align === 'right' ? 'text-right' : 'text-left';

              return (
                <th
                  key={index}
                  className={`px-5 py-3.5 text-[11px] uppercase tracking-wider text-gray-400 font-bold ${align}`}
                >
                  {label}
                </th>
              );
            })}
          </tr>
          </thead>

          <tbody>
          {data.length > 0 ? (
            data.map((item, index) => renderRow(item, index))
          ) : (
            <tr>
              <td colSpan={columns.length} className="text-center py-6 text-sm text-gray-500 font-medium">
                {isLoading && <LoadingSpinner/>}
                <span className={`${!data?.length ? "hidden" : "block"}`}>{emptyError}</span>
              </td>
            </tr>
          )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardTable;