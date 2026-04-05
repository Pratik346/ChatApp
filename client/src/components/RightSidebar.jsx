import React, { useContext, useState, useEffect } from 'react';
import assets from '../assets/assets';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);

  const [msgImages, setMsgImages] = useState([]);

  // Extract images
  useEffect(() => {
    setMsgImages(messages.filter(msg => msg.image).map(msg => msg.image));
  }, [messages]);

  return selectedUser && (
    <div className="h-full flex flex-col bg-[#111b21] text-white border-l border-[#202c33] max-md:hidden">

      {/* HEADER */}
      <div className="p-4 border-b border-[#202c33] text-center">
        <p className="text-sm text-gray-400">Contact Info</p>
      </div>

      {/* PROFILE */}
      <div className="flex flex-col items-center text-center p-6">

        <img
          src={selectedUser.profilePic || assets.avatar_icon}
          className="w-24 h-24 rounded-full object-cover"
        />

        <h2 className="mt-3 text-lg font-medium">
          {selectedUser.fullName}
        </h2>

        <p className="text-xs text-gray-400 mt-1">
          {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
        </p>

        <p className="text-sm text-gray-300 mt-3 px-4">
          {selectedUser.bio || "Hey there! I am using Chat App."}
        </p>
      </div>

      {/* MEDIA */}
      <div className="px-4">
        <p className="text-sm text-gray-400 mb-3">Media, links and docs</p>

        {msgImages.length === 0 ? (
          <p className="text-xs text-gray-500">No media shared</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {msgImages.map((url, index) => (
              <img
                key={index}
                src={url}
                onClick={() => window.open(url)}
                className="w-full h-20 object-cover rounded cursor-pointer hover:opacity-80"
              />
            ))}
          </div>
        )}
      </div>

      {/* LOGOUT */}
      <div className="mt-auto p-4 border-t border-[#202c33]">
        <button
          onClick={logout}
          className="w-full bg-[#202c33] py-2 rounded text-sm hover:bg-[#2a3942] transition"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default RightSidebar;