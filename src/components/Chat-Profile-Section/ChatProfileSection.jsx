import React from "react";
import gigChat from "../../assets/Images/gigChat.svg";

const profileDetails = [
  { label: "From", value: "Russia" },
  { label: "On SIMPLEWORK since", value: "Jan 2020" },
  { label: "English", value: "Fluent" },
  { label: "Spanish", value: "Conversational" },
  { label: "German", value: "Conversational" },
  { label: "Response Rate", value: "100%" },
  { label: "Ratings", value: "4.5" },
  { label: "Completed Orders", value: "34" },
  { label: "Active Orders", value: "3" },
];

const ChatProfileSection = () => {
  return (
    <div className="w-1/4 p-6 rounded-lg text-white">
      <h2 className="text-lg font-bold mb-4">
        About <span className="underline">John</span>
      </h2>
      <div className="space-y-2 text-sm">
        {profileDetails.map(({ label, value }, index) => (
          <p key={index} className="flex justify-between pr-6">
            <span className="text-gray-300">{label}</span>
            <span className="font-semibold">{value}</span>
          </p>
        ))}
      </div>
      <button className="mt-6 px-6 bg-gradient-to-r from-pink-500 to-purple-600 py-2 rounded-full font-normal">
        Support
      </button>
      <img src={gigChat} alt="gig" className="mt-4 w-[90%]" />
    </div>
  );
};

export default ChatProfileSection;