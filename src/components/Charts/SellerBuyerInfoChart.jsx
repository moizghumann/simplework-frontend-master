
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

/**
 * @typedef {{ label: string, color: string }} ChartItem
 * @typedef {{ newBuyers: ChartItem, newSellers: ChartItem }} ChartConfig
 */

const chartData = [
  { month: "January", newBuyers: 186, newSellers: 80 },
  { month: "February", newBuyers: 305, newSellers: 200 },
  { month: "March", newBuyers: 237, newSellers: 120 },
  { month: "April", newBuyers: 73, newSellers: 190 },
  { month: "May", newBuyers: 209, newSellers: 130 },
  { month: "June", newBuyers: 214, newSellers: 140 },
];

/** @type {ChartConfig} */
const chartConfig = {
    newBuyers: {
    label: "Buyers",
    color: "hsl(var(--chart-1))",
  },
  newSellers: {
    label: "Sellers",
    color: "hsl(var(--chart-2))",
  },
};

export function SellerBuyerInfoChart() {
  return (
    <div className="dark">
    <Card>
      <CardHeader>
        <CardTitle>Buyer/Seller - Comparison</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="newBuyers"
              stackId="a"
              fill="var(--color-newBuyers)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="newSellers"
              stackId="a"
              fill="var(--color-newSellers)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing growth comparison for the last 6 months
        </div>
      </CardFooter>
    </Card>
    </div>
  );
}
