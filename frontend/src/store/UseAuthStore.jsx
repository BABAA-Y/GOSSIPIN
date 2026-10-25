import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import io from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === 'development' ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLoggingInUp: false,
  isUpdatingProfileImg: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
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

      get().connectSocket();
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

      get().connectSocket();
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
      get().disconnectSocket();
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

  connectSocket: () => {
    const {authUser} = get()
    if(!authUser || get().socket?.connected) return

    const socket = io(BASE_URL, {
      withCredentials: true
  })

  socket.connect()

  set({socket})

  // listen for online users events

  socket.on("getOnlineUsers", (userIds) => {
    set({onlineUsers: userIds})
  })
  },

  disconnectSocket: () => {
    if(get().socket?.connected) get().socket.disconnect();
  },

}));
