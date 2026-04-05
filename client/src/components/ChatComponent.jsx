import React, { useRef, useEffect, useContext, useState } from 'react';
import assets from '../assets/assets';
import { formatMessageTime } from '../library/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const ChatComponent = () => {
  const { messages, selectedUser, setSelectedUser, sendMessages, getMessages } = useContext(ChatContext);
  const { authUser, onlineUsers } = useContext(AuthContext);

  const scrollEnd = useRef();
  const [input, setInput] = useState('');

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim() === "") return;
    await sendMessages({ text: input.trim() });
    setInput("");
  };

  const handleSendImage = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
      await sendMessages({ image: reader.result });
      e.target.value = "";
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (selectedUser) getMessages(selectedUser._id);
  }, [selectedUser]);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return selectedUser ? (
    <div className="h-full flex flex-col bg-[#111b21] text-white">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-3 bg-[#202c33] border-b border-black/20">
        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          className="w-10 h-10 rounded-full"
        />

        <div className="flex-1">
          <p className="font-medium">{selectedUser.fullName}</p>
          <p className="text-xs text-gray-400">
            {onlineUsers.includes(selectedUser._id) ? "online" : "last seen recently"}
          </p>
        </div>

        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          className="md:hidden w-5 cursor-pointer"
        />
      </div>

      {/* CHAT AREA */}
      <div
        className="flex-1 overflow-y-auto px-4 py-6 space-y-3"
        style={{
          backgroundImage: "url('/whatsapp-bg.png.jpg')",
          backgroundSize: "cover"
        }}
      >
        {messages.map((msg, index) => {
          const isMe = msg.senderId === authUser._id;

          return (
            <div
              key={index}
              className={`flex ${isMe ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[70%]">

                {msg.image ? (
                  <img
                    src={msg.image}
                    className="rounded-lg"
                  />
                ) : (
                  <div
                    className={`px-4 py-2 text-sm rounded-lg shadow
                    ${isMe
                        ? "bg-[#005c4b] text-white rounded-br-none"
                        : "bg-[#202c33] text-white rounded-bl-none"
                      }`}
                  >
                    {msg.text}
                  </div>
                )}

                <div className="text-[10px] text-gray-400 mt-1 flex justify-end items-center gap-1">
                  {formatMessageTime(msg.createdAt)}
                  {isMe && (
                    <span className="text-blue-400 text-xs">✔✔</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={scrollEnd}></div>
      </div>

      {/* INPUT */}
      <div className="p-3 bg-[#202c33] flex items-center gap-3">

        <input
          type="file"
          id="image"
          hidden
          accept="image/png, image/jpeg"
          onChange={handleSendImage}
        />

        <label htmlFor="image">
          <img src={assets.gallery_icon} className="w-5 cursor-pointer" />
        </label>

        <input
          type="text"
          placeholder="Type a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage(e)}
          className="flex-1 bg-[#2a3942] px-4 py-2 rounded-full outline-none text-sm"
        />

        <button
          onClick={handleSendMessage}
          className="bg-[#00a884] p-2 rounded-full hover:scale-110 transition"
        >
          <img src={assets.send_button} className="w-4" />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-full bg-[#111b21] text-gray-400">
      Select a chat to start messaging
    </div>
  );
};

export default ChatComponent;