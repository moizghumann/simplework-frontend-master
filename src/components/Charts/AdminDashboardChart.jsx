import React from "react";
import { ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { MdOutlineShowChart } from "react-icons/md";
import { Badge, Chip } from "@mui/material";

/**
 * @typedef {Object} ChartConfig
 * @property {Object} totalUsers
 * @property {string} totalUsers.label
 * @property {string} totalUsers.color
 * @property {Object} newUsers
 * @property {string} newUsers.label
 * @property {string} newUsers.color
 */

const chartData = [
  { month: "January", totalUsers: 90, newUsers: 80 },
  { month: "February", totalUsers: 370, newUsers: 200 },
  { month: "March", totalUsers: 600, newUsers: 230 },
  { month: "April", totalUsers: 790, newUsers: 190 },
  { month: "May", totalUsers: 920, newUsers: 130 },
  { month: "June", totalUsers: 1060, newUsers: 140 },
];

/** @type {ChartConfig} */
const chartConfig = {
  totalUsers: {
    label: "Total Users",
    color: "#2563eb",
  },
  newUsers: {
    label: "New Users",
    color: "#60a5fa",
  },
};

const AdminDashboardChart = () => {
  return (
    <div>
      <div className="items-center   pb-4 ">
        <div className=" font-semibold text-xl">Audience Stats</div>
        <div className="flex gap-x-4 pt-3">
          <Chip label="1,060 total" color="primary" />
          <div className="flex gap-x-1 items-center">
            <MdOutlineShowChart />
            13.02%
          </div>
        </div>
      </div>
      <ChartContainer config={chartConfig} className="min-h-[50px] w-full">
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />

          <Bar dataKey="totalUsers" fill="var(--color-totalUsers)" radius={4} />
          <Bar dataKey="newUsers" fill="var(--color-newUsers)" radius={4} />
        </BarChart>
      </ChartContainer>
    </div>
  );
};

export default AdminDashboardChart;
