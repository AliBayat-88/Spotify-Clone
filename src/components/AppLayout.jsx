import Header from './Header.jsx'
import SideBar from './SideBar.jsx'
import MainMusicContainer from './MainMusicContainer.jsx'

function AppLayout() {
  return (
    <div className="h-screen flex flex-col bg-black">
      <Header />

      <main className="flex flex-1 gap-2 overflow-hidden text-white">
        <SideBar />
        <MainMusicContainer />
      </main>
    </div>
  );
}

export default AppLayout;
