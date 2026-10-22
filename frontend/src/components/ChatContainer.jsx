import React, { useEffect } from "react";
import { useChatStore } from "../store/UseChatStore";
import { useAuthStore } from "../store/UseAuthStore";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import ChatHeader from "./chatHeader";

function ChatContainer() {
  const { selectedUser, getMessagesByUserId, messages, isMessagesLoading } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
    }
  }, [selectedUser, getMessagesByUserId]);

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader />
        <div className="flex-1 p-6 overflow-auto py-8">
          {!isMessagesLoading && messages.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble   relative ${
                      msg.senderId === authUser._id
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {msg.image && (
                      <img
                        src={msg.img}
                        alt="Shared"
                        className="rounded-lg h-48 object-cover"
                      />
                    )}
                    {msg.text && <p className="mt-2">{msg.text}</p>}

                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : isMessagesLoading ? <MessagesLoadingSkeleton /> : (
            <NoChatHistoryPlaceholder name={selectedUser.fullName} />
          )}
        </div>
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
