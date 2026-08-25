import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './components/AppLayout.jsx'
import SignUpForm from './components/SignUpForm.jsx'
import LoginForm from './components/LoginForm.jsx'
import BrowseContainer from './components/BrowseContainer.jsx'
import MainMusicContainer from './components/MainMusicContainer.jsx'
import TrackContainer from './components/TrackContainer.jsx'
import { PlayerContextProvider } from './context/PlayerContext.jsx'
import LibraryMobile from './components/LibraryMobile.jsx'
import Account from './components/Account.jsx'
import EditInfo from './components/EditInfo.jsx'
import RecoveryPlayLists from './components/RecoveryPlayLists.jsx'
import { LibraryContextProvider } from './context/LibraryContext.jsx'
import PlayListContainer from './components/PlayListContainer.jsx'
import { ToastContextProvider } from './context/ToastContext.jsx'
import PasswordStepForm from './components/PasswordStepForm.jsx'
import GlobalToast from './components/GlobalToast.jsx'
import OtpForm from './components/OtpForm.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ArtistContainer from './components/ArtistContainer.jsx'
import GenreContainer from './components/GenreContainer.jsx'
import DetailsSection from './components/DetailsSection.jsx'
import PasswordForm from './components/PasswordForm.jsx'
import ForgotPasswordForm from './components/ForgotPasswordForm.jsx'
import VerifyEmailPage from './components/VerifyEmailPage.jsx'
import { AuthProvider } from './context/Auth.jsx'
import { AuthCallback } from './components/AuthCallback.jsx'
import PublicPlaylistContainer from './components/PublicPlaylistContainer.jsx'
import ResetPasswordForm from './components/ResetPasswordForm.jsx'
import ChangePassword from './components/ChangePassword.jsx'
import DashboardLayout from './components/Dashboard/DashboardLayout.jsx'
import DashboardHome from './components/Dashboard/DashboardHome.jsx'
import DashboardSongs from './components/Dashboard/DashboardSongs.jsx'
import DashboardArtists from './components/Dashboard/DashboardArtists.jsx'
import DashboardPublicPlaylists from './components/Dashboard/DashboardPublicPlaylists.jsx'
import DashboardSections from './components/Dashboard/DashboardSections.jsx'
import DashboardCategories from './components/Dashboard/DashboardCategories.jsx'
import DashboardUsers from './components/Dashboard/DashboardUsers.jsx'
import MobileOnlyRoute from './components/MobileOnlyRoute.jsx'
import PageNotFound from './components/PageNotFound.jsx'
import AdminProtectedRoute from './components/AdminProtectedRoute.jsx'


const queryClient = new QueryClient({
  defaultOptions: {
    queries : {
      staleTime : 0,
    },
  },
})


function App() {
  return (
    <AuthProvider>
    <QueryClientProvider client={queryClient}>
    <LibraryContextProvider>
    <PlayerContextProvider>
      <ToastContextProvider>


      <BrowserRouter>
      <Routes>


        <Route path="/" element={<AppLayout />}>
          <Route index element={<MainMusicContainer />} />
          <Route path="search" element={<BrowseContainer />} />
          <Route path="track/:id" element={<TrackContainer />} />
          <Route path="artist/:id" element={<ArtistContainer />} />
          <Route path="playList/:id" element={<PlayListContainer />} />
          <Route path="/public-playlist/:id" element={<PublicPlaylistContainer />} />
          <Route path="/genre/:id" element={<GenreContainer />} />
          <Route path="/section/:id" element={<DetailsSection />} />
          <Route
            path="/auth/callback"
            element={<AuthCallback />}
          />
          <Route path="/library" element={<MobileOnlyRoute><LibraryMobile /></MobileOnlyRoute>} />

        </Route>

        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="signup/password-step" element={<PasswordStepForm />} />
        <Route path="signup/verifyEmailPage" element={<VerifyEmailPage/>}/>
        <Route path="login/reset-password" element={<ResetPasswordForm/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="login/otp-login" element={<OtpForm/>}/>
        <Route path="login/password-login" element={<PasswordForm/>}/>
       < Route path="login/forgot-password" element={<ForgotPasswordForm/>}/>


        <Route path="/Account" element={<Account/>}></Route>
        <Route path="Account/edit-info" element={<EditInfo />} />
        <Route path="Account/change-password" element={<ChangePassword />} />
        <Route path="Account/Recovery-PlayLists" element={<RecoveryPlayLists />} />


        <Route
          path="/dashboard"
          element={
            <AdminProtectedRoute>
              <DashboardLayout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="songs" element={<DashboardSongs />} />
          <Route path="artists" element={<DashboardArtists />} />
          <Route path="categories" element={<DashboardCategories />} />
          <Route path="public-playlists" element={<DashboardPublicPlaylists />} />
          <Route path="browse-content" element={<DashboardSections />} />
          <Route path="users" element={<DashboardUsers />} />
        </Route>


        <Route path="*" element={<PageNotFound />} />
      </Routes>
        <GlobalToast/>
    </BrowserRouter>
      </ToastContextProvider>

    </PlayerContextProvider>
    </LibraryContextProvider>
    </QueryClientProvider>
    </AuthProvider>
  );
}


export default App;