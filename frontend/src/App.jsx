import { Navigate, Route, Routes } from "react-router";
import ChatPage from "./pages/chatPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import { useAuthStore } from "./store/UseAuthStore";
import { useEffect } from "react";
import PageLoader from "./components/PageLoader";
import { Toaster } from 'react-hot-toast'

const App = () => {
  const { checkAuth, isCheckingAuth, authUser } = useAuthStore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({authUser});

  if (isCheckingAuth && authUser) {
    return <PageLoader />
  }
  

  return (
    <div className="min-h-screen bg-slate-900 relative flex items-center justify-center p-4 overflow-hidden">
      {/* Decoraters - Grid BG and glow shapes  */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Dot Matrix Pattern */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40 [mask-
  image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_60%,transparent_100%)]"
        />

        {/* Neon Chat Orbs */}
        <div className="absolute top-10 left-10 w-80 h-80 bg-pink-500/30 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-cyan-500/15 rounded-full blur-[100px]" />
      </div>

      <Routes>
        <Route path="/" element={authUser? <ChatPage /> : <Navigate to={"/login"}/>} />
        <Route path="/login" element={!authUser?  <LoginPage /> : <Navigate to={"/"}/>} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to={"/"}/>} />
      </Routes>

      <Toaster/>
    </div>
  );
};

export default App;
