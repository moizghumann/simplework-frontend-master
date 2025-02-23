import React from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineShowChart } from "react-icons/md";

const DashboadCard = ({ title, icon, amount, percentage, month, align }) => {
  return (
    <div
      className="bg-[#353435] text-white h-fit w-[250px] font-poppins p-5 rounded-2xl"
      data-aos={align === "l" ? "fade-left" : "fade-right"}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-2">
          <div className="">{icon}</div>
          <div className="mt-2">{title}</div>
          <div className="font-alegreya text-2xl font-bold">$ {amount} /-</div>
        </div>
        <div className="bg-[#E8E8E8] text-black w-fit px-1 py-1 rounded-lg">
          <BsThreeDots className="text-xl" />
        </div>
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-x-1">
          <MdOutlineShowChart /> {percentage} %
        </div>
        <div className="">From {month}</div>
      </div>
    </div>
  );
};

export default DashboadCard;
