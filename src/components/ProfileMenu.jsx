import { NavLink } from 'react-router-dom';
import ProfileIcon from './ProfileIcon.jsx';
import LibraryIcon from './LibraryIcon.jsx';
import SettingIcon from './SettingIcon.jsx';
import ExitIcon from './ExitIcon.jsx';

function ProfileMenu({ onClick }) {
  return (
    <div className="absolute right-0 top-full mt-2 z-50 w-[200px] rounded-[10px] bg-[#262626] py-3.5 flex flex-col gap-2.5 shadow-2xl select-none">
      <ul className="list-none flex flex-col gap-2.5 px-3.5">
        <NavLink
          to="/account"
          className="group flex items-center gap-2.5 text-[#7e8590] p-1.5 px-1.75 rounded-md cursor-pointer transition-all duration-300 ease-out hover:bg-[#1f701d] hover:text-white hover:-translate-y-0.5 hover:translate-x-0.5 active:scale-[0.99]"
        >
          <ProfileIcon />
          <p className="font-semibold">Profile</p>
        </NavLink>

        <div className="sm:hidden block">
          <NavLink
            to="/library"
            className="group flex items-center gap-2.5 text-[#7e8590] p-1.5 px-1.75 rounded-md cursor-pointer transition-all duration-300 ease-out hover:bg-[#1f701d] hover:text-white hover:-translate-y-0.5 hover:translate-x-0.5 active:scale-[0.99]"
          >
            <LibraryIcon />
            <p className="font-semibold">Library</p>
          </NavLink>
        </div>
      </ul>

      <div className="border-t-[1.5px] border-[#42434a]" />

      <ul className="list-none flex flex-col gap-2 px-2.5">
        {/* 🟢 لینک دادن Settings به صفحه امنیت و تنظیمات */}
        <NavLink
          to="/account/security"
          className="group flex items-center gap-2.5 text-[#7e8590] p-1.5 px-1.75 rounded-md cursor-pointer transition-all duration-300 ease-out hover:bg-[#1f701d] hover:text-white hover:-translate-y-0.5 hover:translate-x-0.5 active:scale-[0.99]"
        >
          <SettingIcon />
          <p className="font-semibold">Settings</p>
        </NavLink>

        <li
          onClick={onClick}
          className="group flex items-center gap-2.5 text-[#7e8590] p-1.5 px-1.75 rounded-md cursor-pointer transition-all duration-300 ease-out hover:bg-[#8e2a2a] hover:text-white hover:-translate-y-0.5 hover:translate-x-0.5 active:scale-[0.99]"
        >
          <ExitIcon />
          <p className="font-semibold">Log out</p>
        </li>
      </ul>
    </div>
  );
}

export default ProfileMenu;