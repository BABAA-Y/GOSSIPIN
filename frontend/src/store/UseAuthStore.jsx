import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingInUp: false,
  isUpdatingProfileImg: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
    } catch (error) {
      console.error("Error in authcheck: ", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });

      toast.success("Account created successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingInUp: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });

      toast.success("Login successfully!");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingInUp: false });
    }
  },

  logout: async (data) => {
    set({ isLoggingInUp: true });
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error logging out");
      console.log("logout error", error);
    }
  },

  updateProfile: async (data) => {
    set({isUpdatingProfileImg: true})
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile Update Successfully");
    } catch (error) {
      console.log("Error in update Profile: ", error);
      toast.error(error.response.data.message);
    } finally{
    set({isUpdatingProfileImg: false})
    }
  },
}));
