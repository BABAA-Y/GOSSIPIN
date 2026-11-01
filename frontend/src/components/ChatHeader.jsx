import React, { useEffect } from "react";
import { useChatStore } from "../store/UseChatStore";
import { XIcon, Trash2Icon } from "lucide-react";
import { useAuthStore } from "../store/UseAuthStore";
import { useState } from "react";

function ChatHeader() {
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const { selectedUser, setSelectedUser, clearChat } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setSelectedUser(null);
      }
    };
    window.addEventListener("keydown", handleEscKey);

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [setSelectedUser]);

  if (!selectedUser) return null;
  const isOnline = onlineUsers?.includes(selectedUser._id);
  return (
    <div className="w-full flex justify-between items-center bg-slate-800/50 border-b border-slate-700/50 h-20 px-6 shrink-0">
      {/* Left side: Avatar + Name/Status */}
      <div className="flex items-center space-x-3">
        <div className={`avatar ${isOnline ? "online" : "offline"}`}>
          <div className="w-12 rounded-full">
            <img
              src={selectedUser.profilePic || "/avatar.png"}
              alt={selectedUser.fullName}
            />
          </div>
        </div>

        <div>
          <h3 className="text-slate-200 font-medium">
            {selectedUser.fullName}
          </h3>
          <p className="text-slate-400 text-sm">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* Right side: Action buttons */}
      <div className="flex items-center space-x-2">
        {/* CLEAR CHAT BUTTON */}
        <button
          onClick={() => setIsClearModalOpen(true)}
          className="p-2 rounded-full hover:bg-slate-700/60 text-slate-400 hover:text-red-400 transition-colors cursor-pointer"
          title="Clear chat"
        >
          <Trash2Icon className="w-5 h-5" />
        </button>

        {/* CLOSE (X) BUTTON */}
        <button
          onClick={() => setSelectedUser(null)}
          className="p-2 rounded-full hover:bg-slate-700/60 text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
          aria-label="Close conversation"
        >
          <XIcon className="w-5 h-5" />
        </button>
      </div>
      {isClearModalOpen && (
        // 1. Dark background overlay (covers full screen)
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center
      justify-center p-4"
        >
          {/* 2. The Popup Box */}
          <div
            className="bg-slate-800 border border-slate-700 p-6 rounded-2xl max-w-sm w-full
        shadow-2xl text-center space-y-4"
          >
            {/* Icon & Warning */}
            <h3 className="text-lg font-semibold text-slate-100">
              Clear Chat?
            </h3>
            <p className="text-sm text-slate-400">
              Are you sure you want to clear this conversation? This will hide
              all messages for you.
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-center pt-2">
              {/* Cancel button */}
              <button
                onClick={() => setIsClearModalOpen(false)}
                className="px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 rounded-lg
              transition-colors"
              >
                Cancel
              </button>

              {/* Confirm Clear button */}
              <button
                onClick={() => {
                  clearChat(selectedUser._id);
                  setIsClearModalOpen(false);
                }}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white font-medium
              rounded-lg transition-colors"
              >
                Clear Chat
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatHeader;
