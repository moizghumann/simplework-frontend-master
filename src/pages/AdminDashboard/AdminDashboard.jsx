import SideMenu from "../../components/SideMenu/SideMenu";
import DashboardCards from "../../components/Cards/DashboardCards";
import AdminDashboardChart from "@/components/Charts/AdminDashboardChart";

const AdminDashboard = () => {
    return (
        <div className="px-5 flex w-full">
          <SideMenu />
          {/* <div className="w-full flex flex-col items-start text-white fade-in"> */}
          <div className="grid grid-cols-6 grid-rows-6 gap-0 text-white fade-in">
            <div className="col-span-4 row-span-4 pt-4 px-4"
            data-aos="fade-right">
              <AdminDashboardChart/>
            </div>
            <div className="col-span-2 row-span-4 col-start-5 mt-10">
              <DashboardCards align={"r"} type={2} />
            </div>
            <div className="col-span-6 row-span-2 row-start-5 flex px-2 py-8">
              <DashboardCards align={"l"} type={1} />
            </div>
          </div>
        </div>
      );
};

export default AdminDashboard;