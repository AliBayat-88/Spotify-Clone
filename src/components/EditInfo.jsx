import { useForm } from "react-hook-form";
import Header from "./Header.jsx";
import ActionBtn from "./ActionBtn.jsx";
import BackBtn from "./BackBtn.jsx";
import { useUpdateProfile } from "../features/useUpdateProfile.js";
import { useAuth } from "../context/Auth.jsx";
import { useUserInfo } from '../features/useUserInfo.js'

function EditInfo() {
  const { user } = useAuth();
  const { updateProfile, isPending } = useUpdateProfile();
  const { avatarUrl } = useUserInfo();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      displayName: user?.user_metadata?.display_name || "",
    },
  });

  function onSubmit(data) {
    const avatarFile = data.avatar?.[0] || null;

    updateProfile({
      displayName: data.displayName,
      avatarFile,
      userId: user?.id,
    });
  }


  return (
    <div className="min-h-screen bg-black text-white flex flex-col select-none">
      <Header />

      <main className="max-w-xl w-full m-auto py-8 flex flex-col gap-y-6">

        {/* Header & Back */}
        <div className="flex items-center gap-x-3 relative">
          <BackBtn />
          <h1 className="text-2xl font-black text-white mt-5">Edit Profile</h1>
        </div>

        {/* Card Form */}
        <div className="bg-[#181818] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#1ed760]/10 blur-[80px] rounded-full pointer-events-none" />

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-6 relative">

            <div className="flex flex-col items-center gap-y-2">
              <div className="relative group select-none">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#262626] group-hover:border-[#1ed760] transition-colors shadow-2xl bg-black">
                  <img
                    className="w-full h-full object-cover group-hover:opacity-40 transition-opacity duration-200"
                    src={avatarUrl}
                    alt="Profile"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/profileImg.png";
                    }}
                  />

                  <label className="absolute inset-0 flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 cursor-pointer transition-opacity text-white text-xs font-bold bg-black/50">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                    </svg>
                    <span>Change</span>
                    <input {...register("avatar")} type="file" className="hidden" accept="image/*" />
                  </label>
                </div>

                <label className="sm:hidden absolute bottom-0 right-0 bg-[#1ed760] text-black p-2 rounded-full shadow-lg cursor-pointer border-2 border-black active:scale-95 transition-all duration-200 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  <input type="file" className="hidden" accept="image/*" />
                </label>
              </div>

              <span className="text-xs text-gray-400 font-medium mt-1">Click to update profile photo</span>
            </div>

            {/* Display Name Input */}
            <div className="flex flex-col gap-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-wider px-0.5">
                Display Name
              </label>

              <input
                type="text"
                {...register("displayName", {
                  required: "Display name is required",
                  validate: (value) => value.trim().length >= 3 || "Enter at least 3 characters",
                })}
                className={`w-full bg-black text-white px-4 py-3.5 rounded-xl border outline-none text-sm font-medium transition-all duration-200 ${
                  errors.displayName
                    ? "border-red-500 focus:ring-1 focus:ring-red-500"
                    : "border-[#262626] focus:border-white focus:ring-1 focus:ring-white"
                }`}
                placeholder="Enter display name"
              />

              {errors.displayName && (
                <span className="text-xs text-red-400 font-semibold px-1">
                  {errors.displayName.message}
                </span>
              )}
            </div>

            <ActionBtn
              type="submit"
              disabled={isPending}
              title={isPending ? "Saving..." : "Save changes"}
              className="w-full mt-2 bg-[#1ed760] text-black font-bold py-3.5 rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            />
          </form>
        </div>
      </main>
    </div>
  );
}

export default EditInfo;