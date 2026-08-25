// components/EditUserRoleModal.jsx
import { useState } from 'react';
import ModalLayout from './ModalLayout.jsx';
import ButtonLoader from '../ButtonLoader.jsx';
import { useUpdateUserRole } from '../../features/useUsersManager.js';

function EditUserRoleModal({ isOpen, onClose, user }) {
  const [selectedRole, setSelectedRole] = useState(user?.role || 'user');

  const { updateUserRole, isUpdatingRole } = useUpdateUserRole(() => {
    onClose();
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (selectedRole === user?.role) {
      onClose();
      return;
    }
    updateUserRole({ userId: user.id, newRole: selectedRole });
  }

  const isPromotingToAdmin = selectedRole === 'admin' && user?.role !== 'admin';

  return (
    <ModalLayout isOpen={isOpen} onClose={onClose} title="Manage User Access">
      <form onSubmit={handleSubmit} className="flex flex-col gap-y-5">

        {/* مشخصات کاربر */}
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-black/50 border border-white/5">
          <img
            loading="lazy"
            src={user?.avatar_url || '/profileImg.png'}
            alt=""
            className="w-12 h-12 rounded-full object-cover border border-white/10 bg-[#222]"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/profileImg.png';
            }}
          />
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-bold text-white truncate">
              {user?.full_name || user?.username || 'Spotify User'}
            </span>
            <span className="text-xs text-gray-500 truncate">ID: {user?.id}</span>
          </div>
        </div>

        {/* انتخاب سطح دسترسی */}
        <div className="flex flex-col gap-y-2">
          <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
            Assign Role
          </label>

          <div className="grid grid-cols-2 gap-3">
            {/* گزینه User عادی */}
            <div
              onClick={() => setSelectedRole('user')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                selectedRole === 'user'
                  ? 'bg-white/10 border-white text-white shadow-md'
                  : 'bg-black/40 border-[#282828] text-gray-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Regular User</span>
                {selectedRole === 'user' && <span className="w-2 h-2 rounded-full bg-white" />}
              </div>
              <span className="text-[11px] text-gray-400 leading-tight">
                Standard access: streaming and personal playlists.
              </span>
            </div>

            {/* گزینه Admin */}
            <div
              onClick={() => setSelectedRole('admin')}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5 ${
                selectedRole === 'admin'
                  ? 'bg-[#1ed760]/10 border-[#1ed760] text-[#1ed760] shadow-[0_0_15px_rgba(30,215,96,0.15)]'
                  : 'bg-black/40 border-[#282828] text-gray-400 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold">Admin</span>
                {selectedRole === 'admin' && <span className="w-2 h-2 rounded-full bg-[#1ed760]" />}
              </div>
              <span className="text-[11px] text-gray-400 leading-tight">
                Full CMS control: upload, edit and delete catalog.
              </span>
            </div>
          </div>
        </div>

        {/* پیام هشدار برای ارتقا به ادمین */}
        {isPromotingToAdmin && (
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs leading-relaxed flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 shrink-0 mt-0.5">
              <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495ZM10 5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 5Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clipRule="evenodd" />
            </svg>
            <span>
              Admins have unrestricted access to modify music tracks, delete sections, and assign privileges.
            </span>
          </div>
        )}

        {/* دکمه‌ها */}
        <div className="flex justify-end gap-3 pt-3 border-t border-white/5">
          <button
            type="button"
            onClick={onClose}
            disabled={isUpdatingRole}
            className="px-5 py-2.5 rounded-full text-gray-400 hover:text-white font-bold text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isUpdatingRole}
            className="px-6 py-2.5 rounded-full bg-[#1ed760] text-black font-bold text-sm hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
          >
            {isUpdatingRole ? <ButtonLoader /> : 'Apply Role'}
          </button>
        </div>
      </form>
    </ModalLayout>
  );
}

export default EditUserRoleModal;