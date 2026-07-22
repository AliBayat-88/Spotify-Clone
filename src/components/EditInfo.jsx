import { useState } from "react";
import {useNavigate } from 'react-router'
import Header from './Header.jsx'
import ActionBtn from './ActionBtn.jsx'

function EditInfo() {
  const Navigate = useNavigate();

  const [email, setEmail] = useState("alibayat@example.com");
  const [password, setPassword] = useState("••••••••••••");
  const [avatar] = useState("/profileImg.png");

  const handleBack = () => {
    Navigate(-1)
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saving data:", { email, password, avatar });
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center min-h-[calc(100vh-64px)] pb-12 select-none">

        <div className="w-full max-w-md mx-auto px-4 flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm font-semibold group cursor-pointer bg-transparent border-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Back
          </button>
          <h1 className="text-base font-bold tracking-tight">Edit Profile</h1>
          <div className="w-10"></div> {/* برای توازن هندسی هدر در حالت Flex */}
        </div>

        <div className="w-full max-w-md mx-auto px-4 mt-8">
          <form onSubmit={handleSave} className="flex flex-col gap-y-6">

            <div className="flex flex-col items-center gap-y-3">
              {/* کانتینر بیرونی را relative می‌کنیم تا مداد بتواند نسبت به آن در گوشه قرار بگیرد */}
              <div className="relative group select-none">

                {/* دایره اصلی عکس پروفایل */}
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#262626] shadow-xl bg-[#181818]">
                  <img
                    className="w-full h-full object-cover group-hover:opacity-40 transition-opacity"
                    src={avatar}
                    alt="Profile"
                  />

                  <label className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white text-[10px] font-bold bg-black/40">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
                    </svg>
                    <span>Change</span>
                    <input type="file" className="hidden" accept="image/*" />
                  </label>
                </div>
                <label className="absolute bottom-0 right-0 bg-[#1ed760] text-black p-2 rounded-full shadow-md cursor-pointer border-2 border-black hover:scale-110 active:scale-90 transition-all duration-200 flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <input type="file" className="hidden" accept="image/*" />
                </label>

              </div>
            </div>

            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#181818] text-white px-4 py-3 rounded-xl border border-[#262626] outline-none focus:border-white focus:bg-[#262626]/30 transition-all duration-200 text-sm font-medium placeholder-gray-500 shadow-inner"
                  placeholder="Enter your email"
                />
              </div>

              <div className="flex flex-col gap-y-1.5">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#181818] text-white px-4 py-3 rounded-xl border border-[#262626] outline-none focus:border-white focus:bg-[#262626]/30 transition-all duration-200 text-sm font-medium placeholder-gray-500 shadow-inner"
                  placeholder="Enter new password"
                />
              </div>

            </div>
            <ActionBtn title="Save changes" />
          </form>
        </div>
      </div>
    </>
  );
}

export default EditInfo;