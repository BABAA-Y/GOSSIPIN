import React, { useEffect, useRef } from "react";
import { ChevronDownIcon, Trash2Icon } from "lucide-react";
import { useChatStore } from "../store/UseChatStore";
import { useAuthStore } from "../store/UseAuthStore";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import ChatHeader from "./ChatHeader";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
    deleteMessageForEveryone,
    deleteMessageForMe,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      subscribeToMessages();

      // clean up
      return () => unsubscribeFromMessages();
    }
  }, [
    selectedUser,
    getMessagesByUserId,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <>
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <ChatHeader />
        <div className="flex-1 p-6 overflow-y-auto overflow-x-hidden py-8">
          {!isMessagesLoading && messages.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div
                  key={msg._id}
                  className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}
                >
                  <div
                    className={`chat-bubble relative group pr-8 ${
                      msg.senderId === authUser._id
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {/* WHATSAPP-STYLE FLOATING MENU */}
                    <div
                      className="absolute top-1.5 right-1.5 opacity-0
                        group-hover:opacity-100 transition-opacity z-20"
                    >
                      <div
                        className={`dropdown ${
                          msg.senderId === authUser._id
                            ? "dropdown-end"
                            : "dropdown-start"
                        }`}
                      >
                        <button
                          tabIndex={0}
                          className="p-1 rounded-full hover:bg-black/30 text-slate-300
                              transition-colors"
                          aria-label="Message options"
                        >
                          <ChevronDownIcon className="w-4 h-4" />
                        </button>

                        <ul
                          tabIndex={0}
                          className="dropdown-content z-50 menu p-1.5 shadow-2xl
                              bg-slate-900/95 backdrop-blur-md border border-slate-700/80
                              rounded-xl w-48 text-xs text-slate-200 mt-2 space-y-1"
                        >
                          {/* ONLY SHOW "DELETE FOR EVERYONE" IF YOU ARE THE SENDER */}
                          {String(msg.senderId) === String(authUser?._id) && (
                            <li>
                              <button
                                onClick={(e) => {
                                  e.currentTarget.blur();
                                  deleteMessageForEveryone(msg._id);
                                }}
                                className="flex items-center gap-2 text-red-400
                                    hover:bg-red-500/10 py-2 rounded-lg font-medium"
                              >
                                <Trash2Icon className="w-3.5 h-3.5" />
                                <span>Delete for everyone</span>
                              </button>
                            </li>
                          )}
                          <li>
                            <button
                              onClick={(e) => {
                                e.currentTarget.blur();
                                deleteMessageForMe(msg._id);
                              }}
                              className="flex items-center gap-2 text-slate-300
                                  hover:bg-slate-800 py-2 rounded-lg font-medium"
                            >
                              <Trash2Icon className="w-3.5 h-3.5 text-slate-400" />
                              <span>Delete for me</span>
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {msg.image && (
                      <img
                        onLoad={() =>
                          messageEndRef.current?.scrollIntoView({
                            behavior: "smooth",
                          })
                        }
                        src={msg.image}
                        alt="Shared"
                        className="max-w-full rounded-lg h-48 object-cover"
                      />
                    )}
                    {msg.text && <p className="mt-2">{msg.text}</p>}

                    <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                      {new Date(msg.createdAt).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              ))}

              <div ref={messageEndRef} />
            </div>
          ) : isMessagesLoading ? (
            <MessagesLoadingSkeleton />
          ) : (
            <NoChatHistoryPlaceholder name={selectedUser.fullName} />
          )}
        </div>
      </div>

      <MessageInput />
    </>
  );
}

export default ChatContainer;
