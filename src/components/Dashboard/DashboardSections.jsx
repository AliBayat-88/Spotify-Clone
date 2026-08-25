import { useState, useMemo } from 'react';
import ActionBtn from '../ActionBtn.jsx';
import TableActions from '../TableActions.jsx';
import Modal from '../Modal.jsx';
import LoadingSpinner from '../LoadingSpinner.jsx';
import CreateSectionModal from './CreateSectionModal.jsx';
import EditSectionModal from './EditSectionModal.jsx';
import { useDetailedSections, useDeleteSection } from '../../features/useSectionsManager.js';
import ManageSectionItemsModal from './ManageSectionItemsModal.jsx'

function DashboardSections() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [sectionToEdit, setSectionToEdit] = useState(null);
  const [sectionToDelete, setSectionToDelete] = useState(null);
  const [managingSection, setManagingSection] = useState(null);

  const { sections = [], isLoading } = useDetailedSections();

  const { deleteSection, isDeleting } = useDeleteSection(() => {
    setSectionToDelete(null);
  });

  const groupedSections = useMemo(() => {
    const groups = {};

    sections.forEach((section) => {
      const groupKey = section.category_id ? `cat_${section.category_id}` : 'home_page';
      const groupTitle = section.category_id ? section.categoryName : 'Home Page (Featured)';

      if (!groups[groupKey]) {
        groups[groupKey] = {
          id: groupKey,
          title: groupTitle,
          isHome: !section.category_id,
          sections: [],
        };
      }

      groups[groupKey].sections.push(section);
    });

    return Object.values(groups);
  }, [sections]);

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-y-8 select-none ">
      {/* هدر صفحه */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Browse Sections
          </h1>
          <p className="text-sm text-gray-400 mt-1">
            Organize rows and content grids displayed on your Home and Category pages.
          </p>
        </div>

        <ActionBtn
          title="+ Create Section"
          className="bg-[#1ed760] text-black font-bold px-6 py-2.5 text-sm self-start sm:self-auto shrink-0 shadow-lg cursor-pointer hover:scale-105 transition-all"
          onClick={() => setIsCreateModalOpen(true)}
        />
      </div>

      {/* لیست سکشن‌های گروه‌بندی‌شده */}
      <div className="flex flex-col gap-y-6">
        {groupedSections.length === 0 ? (
          <div className="text-center py-16 bg-[#181818] rounded-2xl border border-[#262626] text-gray-400 text-sm">
            No sections found. Click + Create Section to create your first content row.
          </div>
        ) : (
          groupedSections.map((group) => (
            <div
              key={group.id}
              className="bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="px-6 py-4 bg-black/40 border-b border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      group.isHome ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : 'bg-[#1ed760]'
                    }`}
                  />
                  <h2 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider">
                    {group.title}
                  </h2>
                </div>

                <span className="text-xs font-semibold text-gray-400 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                  {group.sections.length} {group.sections.length === 1 ? 'Section' : 'Sections'}
                </span>
              </div>

              <div className="divide-y divide-white/5">
                {group.sections.map((section) => (
                  <div
                    key={section.id}
                    className="p-5 sm:px-6 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex flex-col gap-y-1 min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm sm:text-base font-bold text-white truncate">
                          {section.title}
                        </h3>

                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-white/5 text-gray-300 border border-white/10">
                          {section.type}
                        </span>

                        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-[#1ed760]/10 text-[#1ed760] border border-[#1ed760]/20">
                          {section.itemCount} Items
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">ID: {section.id}</p>
                    </div>

                    <div className="flex items-center justify-end gap-2 shrink-0">
                      {section.type !== 'playlist' && (
                        <button
                          type="button"
                          onClick={() => setManagingSection(section)}
                          className="px-3.5 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-gray-200 hover:text-white transition-all cursor-pointer flex items-center gap-1.5"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-3.5 h-3.5 text-[#1ed760]">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </svg>
                          Manage Items
                        </button>
                      )}

                      <TableActions
                        onEdit={() => setSectionToEdit(section)}
                        onDelete={() => setSectionToDelete(section)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* مودال ساخت */}
      {isCreateModalOpen && (
        <CreateSectionModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
        />
      )}

      {managingSection && (
        <ManageSectionItemsModal
          isOpen={Boolean(managingSection)}
          section={managingSection}
          onClose={() => setManagingSection(null)}
        />
      )}

      {sectionToEdit && (
        <EditSectionModal
          isOpen={Boolean(sectionToEdit)}
          section={sectionToEdit}
          onClose={() => setSectionToEdit(null)}
        />
      )}

      {sectionToDelete && (
        <Modal
          isLoading={isDeleting}
          type="delete"
          btnColor="bg-red-500/90"
          explanation={`Are you sure you want to delete "${sectionToDelete.title}"? All items linked to this section will be affected.`}
          isOpen={Boolean(sectionToDelete)}
          btnText="Delete section"
          onConfirm={() => deleteSection(sectionToDelete.id)}
          onClose={() => setSectionToDelete(null)}
        />
      )}
    </div>
  );
}

export default DashboardSections;