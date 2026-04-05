import React, { useContext, useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const {
    getUsers,
    users,
    selectedUser,
    setSelectedUser,
    unseenMessages,
    setUnseenMessages
  } = useContext(ChatContext);

  const { logout, onlineUsers, authUser } = useContext(AuthContext);

  const [input, setInput] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const filteredUsers = input
    ? users.filter((user) =>
        user.fullName.toLowerCase().includes(input.toLowerCase())
      )
    : users;

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className={`h-full flex flex-col bg-[#111b21] text-white ${selectedUser ? "max-md:hidden" : ""}`}>

      {/* HEADER */}
      <div className="flex items-center justify-between p-3 bg-[#202c33]">

        {/* My Profile */}
        <img
          src={authUser?.profilePic || assets.avatar_icon}
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => navigate('/profile')}
        />

        {/* MENU */}
        <div className="relative">
          <img
            src={assets.menu_icon}
            className="w-5 cursor-pointer"
            onClick={() => setMenuOpen(prev => !prev)}
          />

          {menuOpen && (
            <div className="absolute right-0 top-8 bg-[#202c33] border border-black/30 rounded-md p-2 w-36 shadow-lg z-20">
              <p
                onClick={() => {
                  navigate('/profile');
                  setMenuOpen(false);
                }}
                className="text-sm px-2 py-1 hover:bg-[#2a3942] cursor-pointer"
              >
                Profile
              </p>

              <p
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-sm px-2 py-1 hover:bg-[#2a3942] cursor-pointer text-red-400"
              >
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH */}
      <div className="p-2 bg-[#111b21]">
        <div className="flex items-center gap-3 px-4 py-2 bg-[#202c33] rounded-lg">
          <img src={assets.search_icon} className="w-4 opacity-70" />
          <input
            type="text"
            placeholder="Search or start new chat"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-transparent outline-none text-sm flex-1 placeholder-gray-400"
          />
        </div>
      </div>

      {/* USER LIST */}
      <div className="flex-1 overflow-y-auto">

        {filteredUsers.map((user) => {
          const isActive = selectedUser?._id === user._id;
          const unseen = unseenMessages[user._id] || 0;

          return (
            <div
              key={user._id}
              onClick={() => {
                setSelectedUser(user);
                setUnseenMessages(prev => ({
                  ...prev,
                  [user._id]: 0
                }));
              }}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer
              ${isActive ? "bg-[#2a3942]" : "hover:bg-[#202c33]"}`}
            >

              {/* Avatar */}
              <div className="relative">
                <img
                  src={user.profilePic || assets.avatar_icon}
                  className="w-12 h-12 rounded-full object-cover"
                />

                {/* Online Dot */}
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-[#111b21]"></span>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 border-b border-[#202c33] pb-2">
                <p className="text-sm">{user.fullName}</p>
                <p className="text-xs text-gray-400">
                  {onlineUsers.includes(user._id) ? "online" : "offline"}
                </p>
              </div>

              {/* Unseen Messages */}
              {unseen > 0 && (
                <div className="bg-[#00a884] text-xs px-2 py-1 rounded-full">
                  {unseen}
                </div>
              )}
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Sidebar;