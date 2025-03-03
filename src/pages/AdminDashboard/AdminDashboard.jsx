import { AdminCurrentMonthStats } from "@/components/Charts/AdminCurrentMonthStats";
import SideMenu from "../../components/SideMenu/SideMenu";
import { SellerBuyerInfoChart } from "@/components/Charts/SellerBuyerInfoChart";
import React from "react";
import { UsersChart } from "@/components/Charts/UsersChart";
import { RevenueChart } from "@/components/Charts/RevenueChart";

const AdminDashboard = () => {
  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div className="grid grid-cols-9 grid-rows-4 text-white gap-10 pt-7 pl-7 pb-28">
        <div className="col-span-3 row-span-2">
          <UsersChart/>
        </div>
        <div className="col-span-3 row-span-2 col-start-4">
          <RevenueChart/>
        </div>
        <div className="col-span-3 row-span-2 col-start-7">
        <SellerBuyerInfoChart />
        </div>
        <div className="col-span-9 row-span-2 row-start-3 mt-[-48px]">
        <AdminCurrentMonthStats />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
