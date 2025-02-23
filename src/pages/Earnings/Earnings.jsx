import React from "react";
import GradientBtn from "../../components/Buttons/GradientBtn";
import EarningTable from "../../components/tables/EarningTable";
import { useNavigate } from "react-router-dom";

const Earnings = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col p-8">
      <div className="w-full h-fit flex justify-center items-center">
        <div className="text-white uppercase font-poppins text-xl font-bold w-[97%] max-w-[1200px]">
          Earnings
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center mb-8">
        <div className="flex gap-x-5 justify-center items-center flex-wrap max-w-[1200px]">
          <div className="">
            <div className="text-white font-poppins uppercase py-[12px]">
              Available Funds
            </div>
            <div className="bg-[#FFFFFF33] text-white w-[300px] p-5 py-7  rounded-2xl font-poppins">
              <div className="font-poppins text-[.9rem] font-normal">
                Balance available for use
              </div>
              <div className="font-alegreya text-3xl font-bold my-4">
                $ 2.800k
              </div>
              <div className="">
                <GradientBtn title={"Withdraw"} />
              </div>
              <div
                className="underline mt-4 cursor-pointer"
                onClick={() => {
                  navigate("/seller/earnings/manage_payment_methods");
                }}
              >
                Manage Payment Methods
              </div>
            </div>
          </div>
          <div className="">
            <div className="text-white font-poppins uppercase py-[12px]">
              Future funds
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="bg-[#FFFFFF33] text-white w-[300px] p-5  rounded-2xl font-poppins">
                <div className="font-poppins text-[.9rem] font-normal">
                  Payment Being Cleared
                </div>
                <div className="font-alegreya text-3xl font-bold mt-4 flex justify-between items-center">
                  <div className="">$ 800</div>
                  <div className="text-sm font-thin">03 Payments</div>
                </div>
              </div>
              <div className="bg-[#FFFFFF33] text-white w-[300px] p-5  rounded-2xl font-poppins">
                <div className="font-poppins text-[.9rem] font-normal">
                  Payment Of Active Orders
                </div>
                <div className="font-alegreya text-3xl font-bold mt-4 flex justify-between items-center">
                  <div className="">$ 500</div>
                  <div className="text-sm font-thin">02 Payments</div>
                </div>
              </div>
            </div>
          </div>
          <div className="">
            <div className="text-white font-poppins uppercase flex justify-between items-center py-2">
              <div className="">Earnings & expenses</div>
              <div className="p-[4px] rounded-lg border-2 border-white text-[.8rem]">
                This Year
              </div>
            </div>
            <div className="flex flex-col gap-y-5">
              <div className="bg-[#FFFFFF33] text-white w-[330px] p-5  rounded-2xl font-poppins">
                <div className="font-poppins text-[.9rem] font-normal">
                  Payment Being Cleared
                </div>
                <div className="font-alegreya text-3xl font-bold mt-4 flex justify-between items-center">
                  <div className="">$ 800</div>
                  <div className="text-sm font-thin">03 Payments</div>
                </div>
              </div>
              <div className="bg-[#FFFFFF33] text-white w-[330px] p-5  rounded-2xl font-poppins">
                <div className="font-poppins text-[.9rem] font-normal">
                  Payment Of Active Orders
                </div>
                <div className="font-alegreya text-3xl font-bold mt-4 flex justify-between items-center">
                  <div className="">$ 500</div>
                  <div className="text-sm font-thin">02 Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <div className="text-white uppercase font-poppins text-xl font-bold w-[97%] max-w-[1200px]">
          withdraw
        </div>
      </div>
      <div className="w-full h-fit flex justify-center items-center">
        <div className="w-[97%] max-w-[1200px]">
          <EarningTable
            status={"Active"}
            data={[
              {
                avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
                productImage: "https://via.placeholder.com/100x60", // Replace with actual image URL
                due_on: new Date(),
                total: 200,
                notes: "lashjvdhgascvdhgaschgxcashgcxahgc",
                status: "ACTIVE",
              },
              {
                avatar: "https://via.placeholder.com/50", // Replace with actual avatar URL
                productImage: "https://via.placeholder.com/100x60", // Replace with actual image URL
                due_on: new Date(),
                total: 200,
                notes: "lashjvdhgascvdhgaschgxcashgcxahgc",
                status: "ACTIVE",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default Earnings;
