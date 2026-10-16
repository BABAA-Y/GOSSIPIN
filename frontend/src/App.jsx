import { Route, Routes } from "react-router";
import ChatPage from "./pages/chatPage";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import { useAuthStore } from "./store/UseAuthStore";

const App = () => {

  const {authUser, isLoggedIn, login} = useAuthStore()
  console.log("auth user:", authUser);
  console.log("isLoggedIn user:", isLoggedIn);

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

      <button onClick={login} className="z-10">login</button>

      <Routes>
        <Route path="/" element={<ChatPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </div>
  );
};

export default App;
