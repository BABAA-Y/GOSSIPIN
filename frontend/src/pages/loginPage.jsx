import React, { useState } from "react";
import { useAuthStore } from "../store/UseAuthStore";
import BorderAnimatedContainer from "../components/BorderAnimatedContainer";
import {
  MessageCircleIcon,
  LockIcon,
  MailIcon,
  UserIcon,
  LoaderIcon,
  Mail,
} from "lucide-react";
import { Link } from "react-router";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLogginIn } = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="relative w-full max-w-6xl md:h-[800px] h-auto min-h-[600px]">
        <BorderAnimatedContainer>
          <div className="w-full h-full flex flex-col md:flex-row">
            {/* form column - left side */}
            <div className="w-full md:w-1/2 p-6 sm:p-10 flex items-center justify-center md:border-r border-slate-700/50">
              <div className="w-full max-w-md">
                {/* heading text */}
                <div className="text-center mb-8">
                  <MessageCircleIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
                  <h2 className="text-2xl font-bold text-slate-200 mb-2">
                    Welcome back
                  </h2>
                  <p className="text-slate-400">Login to access your account</p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Email  */}
                  <div>
                    <label className="auth-input-label">Email</label>
                    <div className="relative">
                      <MailIcon className="auth-input-icon" />

                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="input"
                        placeholder="JohnDoe@gmail.com"
                      />
                    </div>
                  </div>

                  {/* password  */}
                  <div>
                    <label className="auth-input-label">Password</label>
                    <div className="relative">
                      <LockIcon className="auth-input-icon" />

                      <input
                        type="password"
                        value={formData.password}
                        onChange={(e) =>
                          setFormData({ ...formData, password: e.target.value })
                        }
                        className="input"
                        placeholder="Enter your Password"
                      />
                    </div>
                  </div>
                  {/* submit button */}
                  <button
                    className="auth-btn"
                    type="submit"
                    disabled={isLogginIn}
                  >
                    {isLogginIn ? (
                      <LoaderIcon className="w-full h-5 animate-spin text-center" />
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                </form>

                <div className="mt-6 text-center">
                  <Link to="/signup" className="auth-link">
                    Don't have an account? SignIn
                  </Link>
                </div>
              </div>
            </div>

            {/* FORM illustration right side */}
            <div className="hidden md:flex md:w-1/2 flex-col items-center justify-center p-8 bg-gradient-to-bl from-slate-800/30 to-transparent">
              <div className="w-full max-w-md text-center">
                <img
                  src="/login.png"
                  alt="People using mobile devices"
                  className="w-full max-h-[380px] object-contain mx-auto drop-shadow-2xl"
                />
                <div className="mt-6 text-center">
                  <h3 className="text-xl font-medium text-cyan-400">
                    Connect Anytime, Anywhere
                  </h3>

                  <div className="mt-4 flex justify-center gap-4">
                    <span className="auth-badge">Secure</span>
                    <span className="auth-badge">Fast</span>
                    <span className="auth-badge">Reliable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </BorderAnimatedContainer>
      </div>
    </div>
  );
}
export default LoginPage;
