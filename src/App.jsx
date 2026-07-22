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
          <Route path="/genre/:id" element={<GenreContainer />} />
          <Route path="/section/:id" element={<DetailsSection />} />
          <Route
            path="/auth/callback"
            element={<AuthCallback />}
          />

        </Route>

        <Route path="/signUp" element={<SignUpForm />} />
        <Route path="signup/password-step" element={<PasswordStepForm />} />
        <Route path="signup/verifyEmailPage" element={<VerifyEmailPage/>}/>
        <Route path="/login" element={<LoginForm />} />
        <Route path="login/otp-login" element={<OtpForm/>}/>
        <Route path="login/password-login" element={<PasswordForm/>}/>
       < Route path="login/forgot-password" element={<ForgotPasswordForm/>}/>
        <Route path="/library" element={<LibraryMobile />} />

        <Route path="/Account" element={<Account/>}></Route>
        <Route path="Account/EditInfo" element={<EditInfo />} />
        <Route path="Account/Recovery-PlayLists" element={<RecoveryPlayLists />} />



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