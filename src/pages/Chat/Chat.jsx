import React, { useState, useEffect, useRef } from "react";
import { FaPaperclip, FaRegSmile } from "react-icons/fa";
import chatAvatar from "../../assets/Images/chatAvatar.svg";
import chatMsg from "../../assets/Images/chatMsg.svg";
import chatStar from "../../assets/Images/chatStar.svg";
import audioCall from "../../assets/Images/audioCallChat.svg";
import deleteChat from "../../assets/Images/deleteChat.svg";
import videoCall from "../../assets/Images/videoCallChat.svg";
import settingsChat from "../../assets/Images/settingsChat.svg";
import micChat from "../../assets/Images/micChat.svg";
import dropdown from "../../assets/Images/dropdown.svg";
import searchChat from "../../assets/Images/searchChat.svg";
import GigModal from "../../components/Chat/GigModal";
import { GetLoggedInUser } from "../../Api_Requests/Api_Requests";
import ChatProfileSection from "@/components/Chat-Profile-Section/ChatProfileSection";
import { useFirebase } from "@/context/useFirebase";
import VoiceMessageRecorder from "@/components/VoiceMessage/VoiceMessageRecorder";
import AudioMessage from "@/components/Audio/AudioMessage";

// const messages = [
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
//   { name: "Nazma", message: "Me: are you available", time: "1 week" },
// ];

// const chatMessages = [
//   { sender: "Nazma", text: "Hi There", time: "02:22 PM" },
//   { sender: "You", text: "How Are You Doing?", time: "02:22 PM" },
//   { sender: "Nazma", text: "I'm Good Thank You!", time: "02:22 PM" },
//   { sender: "You", text: "Hii", time: "02:22 PM" },
// ];

export default function Chat() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isRecordingMode, setIsRecordingMode] = useState(false);
  const {
    currentUser,
    users,
    selectedUser,
    messages,
    fetchAndSetCurrentUser,
    setSelectedUser,
    sendMessage,
    sendVoiceMessage,
  } = useFirebase();

  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef(null);

  // Fetch current user on mount
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const {
          data: { userData },
        } = await GetLoggedInUser();
        if (userData) {
          console.log("user data", userData);
          fetchAndSetCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (users.length > 0) {
      setSelectedUser(users[0]);
    }
  }, [users]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSendMessage = async (e) => {
    console.log("message", messageText);
    e.preventDefault();

    if (await sendMessage(messageText)) {
      setMessageText("");
    }
  };

  const handleVoiceRecorded = async (audioBlob) => {
    if (await sendVoiceMessage(audioBlob)) {
      setIsRecordingMode(false);
    }
  };

  const toggleRecordingMode = () => {
    setIsRecordingMode(!isRecordingMode);
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex h-full p-4 text-white mb-10">
      {/* Sidebar */}
      <div className="w-[22%] bg-transparent p-4 rounded-lg overflow-y-auto">
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold mb-4 flex gap-2">
            <span>All Messages</span>
            <img src={dropdown} alt="dropdown"></img>
          </div>
          <div>
            <img src={searchChat} alt="search Icon" className="mb-3"></img>
          </div>
        </div>
        <div className="space-y-4 cursor-pointer">
          {users.map((user, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-transparent rounded-lg"
            >
              <div
                className="flex items-center space-x-3"
                onClick={() => setSelectedUser(user)}
              >
                <img src={chatAvatar} alt="avatar" className="rounded-full" />
                <div>
                  <p className="font-semibold">
                    {user.username} {user.online ? "🟢" : "🔴"}
                  </p>
                  <p className="text-sm text-gray-400">{user.message}</p>
                </div>
              </div>
              <div className="text-xs text-gray-400 flex flex-col">
                <span> {user.time}</span>
                <div className="flex justify-between">
                  <img src={chatMsg} alt="chat user" />
                  <img src={chatStar} alt="chat star" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Section */}
      <div className="flex flex-col flex-1 mx-8 my-8 bg-transparent border border-gray-500 rounded-2xl p-10">
        <div className="lg:flex lg:justify-between border-b border-gray-700 pb-4 mb-8">
          <div>
            <div className="flex items-center space-x-3 ">
              <img src={chatAvatar} alt="Nazma" className="rounded-full" />
              <div className="flex flex-col">
                <p className="font-bold">{selectedUser?.username}</p>
                <span className="text-sm text-green-400">Active Now</span>
              </div>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <img src={deleteChat} alt="delete"></img>
            <img src={audioCall} alt="audio"></img>
            <img src={videoCall} alt="video"></img>
            <img src={settingsChat} alt="settings"></img>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === currentUser._id
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {msg.type === "voice" ? (
                <AudioMessage
                  url={msg.voiceUrl}
                  time={
                    msg.createdAt?.toDate().toLocaleTimeString() || "Sending..."
                  }
                />
              ) : (
                <div
                  className={`max-w-xs p-3 rounded-lg ${
                    msg.senderId === currentUser._id
                      ? "bg-purple-600"
                      : "bg-gray-800"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-xs text-gray-400 block mt-1">
                    {msg.createdAt?.toDate().toLocaleTimeString() ||
                      "Sending..."}
                  </span>
                </div>
              )}
              {/* <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.senderId === currentUser._id
                    ? "bg-purple-600"
                    : "bg-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {msg.createdAt?.toDate().toLocaleTimeString() || "Sending..."}
                </span>
              </div> */}
            </div>
          ))}
        </div>

        <div>
          <button
            type="button"
            className="p-3 px-4 border bg-[#DE0588] border-[#DE0588] rounded-lg"
            onClick={() => setModalOpen(true)}
          >
            Create an Offer
          </button>
        </div>
        <div className="flex items-center justify-end space-x-4 mt-4 bg-gray-900 p-3 rounded-lg">
          {isRecordingMode ? (
            <VoiceMessageRecorder onVoiceRecorded={handleVoiceRecorded} />
          ) : (
            <>
              <input
                type="text"
                className="flex-1 bg-transparent text-white p-2 outline-none"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message"
              />
              <FaRegSmile className="text-white cursor-pointer" size={20} />
              <FaPaperclip className="text-white cursor-pointer" />
              <img
                src={micChat}
                alt="mic"
                className="cursor-pointer"
                onClick={toggleRecordingMode}
              />
              <button
                className="bg-pink-600 p-2 px-4 rounded-lg text-white"
                onClick={handleSendMessage}
              >
                Send
              </button>
            </>
          )}

          <GigModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>

      {/* Profile Section */}
      <ChatProfileSection />
    </div>
  );
}
