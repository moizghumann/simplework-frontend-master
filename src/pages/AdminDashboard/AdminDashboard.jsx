import SideMenu from "../../components/SideMenu/SideMenu";
import DashboadAllSalesChart from "../../components/Charts/DashboadAllSalesChart";
import DashboardCards from "../../components/Cards/DashboardCards";

const AdminDashboard = () => {
    return (
        <div className="px-5 flex w-full">
          <SideMenu />
          <div className="w-full flex flex-col items-start text-white fade-in">
            <div className="flex pt-4 px-4">
              <DashboadAllSalesChart />
              <DashboardCards align={"l"} type={1} />
            </div>
            <div className="px-2 py-8">
              <DashboardCards align={"r"} type={2} />
            </div>
          </div>
        </div>
      );
};

export default AdminDashboard;