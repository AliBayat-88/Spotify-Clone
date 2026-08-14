import { useState } from 'react';
import ActionBtn from '../ActionBtn.jsx';
import TableActions from '../TableActions.jsx';

function DashboardSections() {
  const [categoriesData] = useState([
    {
      categoryId: 1,
      categoryName: 'Pop',
      sections: [
        {
          id: 101,
          title: 'Popular',
          description: 'Popular music and trending tracks for everyone.',
          itemCount: 12,
        },
        {
          id: 102,
          title: 'Trending Pop Hits',
          description: 'Top energetic pop songs dominating charts.',
          itemCount: 8,
        },
      ],
    },
    {
      categoryId: 2,
      categoryName: 'Persian',
      sections: [
        {
          id: 201,
          title: 'Persian Hits',
          description: 'The latest and greatest Persian music.',
          itemCount: 15,
        },
        {
          id: 202,
          title: 'Nostalgic Persian',
          description: 'Classic memorable tracks from the golden era.',
          itemCount: 6,
        },
      ],
    },
    {
      categoryId: 3,
      categoryName: 'Hip Hop & Rap',
      sections: [
        {
          id: 301,
          title: 'Top Raphits',
          description: 'Hard-hitting beats and top rap artists.',
          itemCount: 10,
        },
      ],
    },
  ]);

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-8 select-none">
      {/* هدر بالای صفحه */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Browse Sections
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Organize and manage the content rows displayed on your home and browse pages.
          </p>
        </div>

        <ActionBtn
          title="+ Create Section"
          className="bg-[#1ed760] text-black font-bold px-6 py-2.5 text-sm self-start sm:self-auto shrink-0 shadow-lg"
          onClick={() => console.log('Open Create Section Modal')}
        />
      </div>

      {/* لیست سکشن‌ها دسته‌بندی‌شده براساس Category */}
      <div className="flex flex-col gap-y-6">
        {categoriesData.map((category) => (
          <div
            key={category.categoryId}
            className="bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden shadow-xl"
          >
            {/* هدر دسته‌بندی (Category Header) */}
            <div className="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#1ed760]" />
                <h2 className="text-base font-bold text-white uppercase tracking-wider">
                  {category.categoryName}
                </h2>
              </div>

              <span className="text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                {category.sections.length} Sections
              </span>
            </div>

            {/* لیست سکشن‌های داخل این دسته‌بندی */}
            <div className="divide-y divide-white/5">
              {category.sections.map((section) => (
                <div
                  key={section.id}
                  className="p-5 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                >
                  {/* اطلاعات سکشن */}
                  <div className="flex flex-col gap-y-1 min-w-0">
                    <div className="flex items-center gap-3">
                      <h3 className="text-sm sm:text-base font-bold text-white truncate">
                        {section.title}
                      </h3>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#1ed760]/10 text-[#1ed760] border border-[#1ed760]/20">
                        {section.itemCount} Items
                      </span>
                    </div>
                    <p className="text-xs text-gray-400 truncate max-w-xl">
                      {section.description}
                    </p>
                  </div>

                  {/* دکمه‌های مدیریت سکشن */}
                  <div className="flex items-center justify-end gap-2 shrink-0">
                    {/* دکمه مدیریت محتویات سکشن */}
                    <button
                      type="button"
                      onClick={() => console.log('Manage content for section:', section.id)}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-3.5 h-3.5 text-[#1ed760]"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                      Manage Items
                    </button>

                    <TableActions
                      onEdit={() => console.log('Edit section metadata:', section.id)}
                      onDelete={() => console.log('Delete section:', section.id)}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DashboardSections;