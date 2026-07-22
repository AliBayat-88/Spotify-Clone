import Header from './Header.jsx';
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import Modal from './Modal.jsx'

function Account() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);

  const user = {
    name: "Ali Bayat",
    email: "alibayat@example.com",
    avatar: "/profileImg.png"
  };

  return (
    <div className="min-h-screen bg-black text-white pb-32 select-none">
      <Header />

      <div className="max-w-xl mx-auto px-4 mt-6 flex flex-col gap-y-6">

        <div className="bg-[#181818] border border-[#262626] rounded-2xl p-5 flex items-center gap-4 shadow-xl">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden shrink-0 bg-[#262626] border-2 border-[#3e3e3e] shadow-md">
            <img className="w-full h-full object-cover" src={user.avatar} alt="Profile" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-xs font-bold uppercase tracking-widest text-[#1ed760] mb-0.5">Free Account</span>
            <h1 className="text-xl sm:text-2xl font-black text-white truncate tracking-tight">{user.name}</h1>
            <p className="text-gray-400 text-xs sm:text-sm truncate mt-0.5">{user.email}</p>
          </div>
        </div>

        <div className="flex flex-col gap-y-2">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-1">Account Management</h2>

          <div className="bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden shadow-lg">
            <NavLink to="EditInfo" className="flex items-center justify-between p-4 hover:bg-[#262626]/50 active:bg-[#262626] transition-colors cursor-pointer group active:scale-[0.995]">
              <div className="flex items-center gap-3">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-semibold">Edit Info</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </NavLink>

            <div className="border-t border-[#262626]" />

            <NavLink to="Recovery-PlayLists" className="flex items-center justify-between p-4 hover:bg-[#262626]/50 active:bg-[#262626] transition-colors cursor-pointer group active:scale-[0.995]">
              <div className="flex items-center gap-3">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-semibold">Recovery Playlist</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </NavLink>
          </div>
        </div>

        {isModalOpen && <Modal type="delete" btnColor="bg-red-500/90" explanation="Are you sure you want to sign out of all devices?" isOpen={isModalOpen} btnText="Sign out" onClose={() => setIsModalOpen(false)} />}

        <div className="flex flex-col gap-y-2">
          <h2 className="text-sm font-bold text-gray-400 uppercase tracking-wider px-1">Security & Privacy</h2>

          <div className="bg-[#181818] border border-[#262626] rounded-2xl overflow-hidden shadow-lg">
            <div  onClick={() => {
              setIsModalOpen(true);}} className="flex items-center justify-between p-4 hover:bg-[#262626]/50 active:bg-[#262626] transition-colors cursor-pointer group active:scale-[0.995]">
              <div className="flex items-center gap-3">
                <div className="text-gray-400 group-hover:text-white transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-semibold">Sign out everywhere</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-gray-500 group-hover:text-white transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>

            <div className="border-t border-[#262626]" />

            {isModalDeleteOpen && <Modal type="delete" explanation="Do you relly want to delete your account? you are not able to turn it back!" btnColor="bg-red-500/90" isOpen={isModalDeleteOpen} btnText="Delete Account" onClose={() => setIsModalDeleteOpen(false)} />}

            <div onClick={() => {
              setIsModalDeleteOpen(true);}} className="flex items-center justify-between p-4 hover:bg-red-950/20 active:bg-red-950/40 transition-colors cursor-pointer group active:scale-[0.995]">
              <div className="flex items-center gap-3">
                <div className="text-red-500/70 group-hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-semibold text-red-500/90 group-hover:text-red-500">Delete Account</span>
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4 text-red-500/40 group-hover:text-red-500 transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Account;