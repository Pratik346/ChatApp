import React, { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import Sidebar from '../components/Sidebar';
import ChatComponent from '../components/ChatComponent';
import RightSidebar from '../components/RightSidebar';

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen bg-[#111b21] flex">

      {/* SIDEBAR */}
      <div className={`${selectedUser ? "hidden md:block md:w-[30%] lg:w-[25%]" : "w-full md:w-[30%] lg:w-[25%]"}`}>
        <Sidebar />
      </div>

      {/* CHAT AREA */}
      <div className={`${selectedUser ? "w-full md:w-[45%] lg:w-[50%]" : "hidden md:flex md:w-[70%] lg:w-[75%]"} border-l border-[#202c33]`}>
        <ChatComponent />
      </div>

      {/* RIGHT SIDEBAR */}
      {selectedUser && (
        <div className="hidden lg:block lg:w-[25%] border-l border-[#202c33]">
          <RightSidebar />
        </div>
      )}

    </div>
  );
};

export default HomePage;