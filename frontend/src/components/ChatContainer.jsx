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
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto overflow-x-hidden py-8">
          {!isMessagesLoading && messages.length > 0 ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((msg) => {
                const isMyMessage =
                  String(msg.senderId) === String(authUser?._id);

                return (
                  <div
                    key={msg._id}
                    className={`chat ${isMyMessage ? "chat-end" : "chat-start"}`}
                  >
                    <div
                      className={`chat-bubble max-w-[85%] sm:max-w-[75%] break-words relative group ${
                        msg.image && !msg.text ? "p-1.5" : "p-3 pr-8"
                      } ${
                        isMyMessage
                          ? "bg-cyan-600 text-white"
                          : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      {/* WHATSAPP-STYLE DROPDOWN BUTTON */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                        <div
                          className={`dropdown ${
                            isMyMessage ? "dropdown-end" : "dropdown-start"
                          }`}
                        >
                          <button
                            tabIndex={0}
                            className={`p-1 rounded-full transition-colors cursor-pointer ${
                              msg.image && !msg.text
                                ? "bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm"
                                : "hover:bg-black/20 text-slate-300"
                            }`}
                            aria-label="Message options"
                          >
                            <ChevronDownIcon className="w-4 h-4" />
                          </button>

                          <ul
                            tabIndex={0}
                            className="dropdown-content z-50 menu p-1.5 shadow-2xl bg-slate-900/95 backdrop-blur-md border border-slate-700/80 rounded-xl w-48 text-xs text-slate-200 mt-2 space-y-1"
                          >
                            {/* ONLY SHOW "DELETE FOR EVERYONE" IF YOU ARE THE SENDER */}
                            {isMyMessage && (
                              <li>
                                <button
                                  onClick={(e) => {
                                    e.currentTarget.blur();
                                    deleteMessageForEveryone(msg._id);
                                  }}
                                  className="flex items-center gap-2 text-red-400 hover:bg-red-500/10 py-2 rounded-lg font-medium cursor-pointer"
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
                                className="flex items-center gap-2 text-slate-300 hover:bg-slate-800 py-2 rounded-lg font-medium cursor-pointer"
                              >
                                <Trash2Icon className="w-3.5 h-3.5 text-slate-400" />
                                <span>Delete for me</span>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>

                      {/* PHOTO CARD */}
                      {msg.image && (
                        <div className="relative rounded-xl overflow-hidden">
                          <img
                            onLoad={() =>
                              messageEndRef.current?.scrollIntoView({
                                behavior: "smooth",
                              })
                            }
                            src={msg.image}
                            alt="Shared"
                            onClick={() => window.open(msg.image, "_blank")}
                            className="rounded-xl max-h-80 w-auto max-w-full object-contain cursor-pointer hover:opacity-95 transition-opacity"
                          />
                          {/* FLOATING TIMESTAMP IF PHOTO ONLY */}
                          {!msg.text && (
                            <span className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] px-2 py-0.5 rounded-full font-medium">
                              {msg.createdAt
                                ? new Date(msg.createdAt).toLocaleTimeString(
                                    [],
                                    {
                                      hour: "2-digit",
                                      minute: "2-digit",
                                    }
                                  )
                                : ""}
                            </span>
                          )}
                        </div>
                      )}

                      {/* TEXT CAPTION */}
                      {msg.text && (
                        <p className="mt-1 text-sm leading-relaxed">
                          {msg.text}
                        </p>
                      )}

                      {/* TIMESTAMP IF THERE IS TEXT */}
                      {msg.text && (
                        <p className="text-[10px] mt-1 opacity-75 flex items-center justify-end gap-1">
                          {msg.createdAt
                            ? new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}

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
