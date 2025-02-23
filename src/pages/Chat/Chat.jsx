import React,{useState} from "react";
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
import gigChat from "../../assets/Images/gigChat.svg";
import GigModal from "../../components/Chat/GigModal";

const messages = [
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
  { name: "Nazma", message: "Me: are you available", time: "1 week" },
];

const chatMessages = [
  { sender: "Nazma", text: "Hi There", time: "02:22 PM" },
  { sender: "You", text: "How Are You Doing?", time: "02:22 PM" },
  { sender: "Nazma", text: "I'm Good Thank You!", time: "02:22 PM" },
  { sender: "You", text: "Hii", time: "02:22 PM" },
];

export default function Chat() {
  const [isModalOpen, setModalOpen] = useState(false);
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
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-transparent rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <img src={chatAvatar} alt="avatar" className="rounded-full" />
                <div>
                  <p className="font-semibold">{msg.name}</p>
                  <p className="text-sm text-gray-400">{msg.message}</p>
                </div>
              </div>
              <div className="text-xs text-gray-400 flex flex-col">
                <span> {msg.time}</span>
                <div className="flex justify-between">
                  <img src={chatMsg} alt="chat msg" />
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
                <p className="font-bold">Nazma</p>
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
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "You" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  msg.sender === "You" ? "bg-purple-600" : "bg-gray-800"
                }`}
              >
                <p>{msg.text}</p>
                <span className="text-xs text-gray-400 block mt-1">
                  {msg.time}
                </span>
              </div>
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
        <div className="flex items-center space-x-4 mt-4 bg-gray-900 p-3 rounded-lg">
          <input
            type="text"
            className="flex-1 bg-transparent text-white p-2 outline-none"
            placeholder="Type your message"
          />
          <FaRegSmile className="text-white cursor-pointer" size={20} />
          <FaPaperclip className="text-white cursor-pointer" />
          <img src={micChat} alt="mic" className="cursor-pointer" />
          <button className="bg-pink-600 p-2 px-4 rounded-lg text-white">
            Send
          </button>
          <GigModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
        </div>
      </div>

      {/* Profile Section */}
      <div className="w-1/4  p-6 rounded-lg text-white">
        <h2 className="text-lg font-bold mb-4">
          About <span className="underline">John</span>
        </h2>
        <div className="space-y-2 text-sm">
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">From</span>{" "}
            <span className="font-semibold">Russia</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">On SIMPLEWORK since</span>{" "}
            <span className="font-semibold">Jan 2020</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">English</span>{" "}
            <span className="font-semibold">Fluent</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">Spanish</span>{" "}
            <span className="font-semibold">Conversational</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">German</span>{" "}
            <span className="font-semibold">Conversational</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">Response Rate</span>{" "}
            <span className="font-semibold">100%</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">Ratings</span>{" "}
            <span className="font-semibold">4.5</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">Completed Orders</span>{" "}
            <span className="font-semibold">34</span>
          </p>
          <p className="flex justify-between pr-6">
            <span className="text-gray-300">Active Orders</span>{" "}
            <span className="font-semibold">3</span>
          </p>
        </div>
        <button className="mt-6 px-6 bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-full  font-normal">
          Support
        </button>
        <img src={gigChat} alt="gig" className="mt-4 w-[90%]"></img>

      </div>
    </div>
  );
}
