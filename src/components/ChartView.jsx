import React, { useMemo } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function ChartView({ data }) {
  const chartData = data?.data || {};

  const newUsers = useMemo(
    () => [
      { name: "Today", value: Number(chartData?.todaysUserAddition) || 0 },
      {
        name: "7 Days",
        value: Number(chartData?.lastSevenDaysUserAddition) || 0,
      },
      {
        name: "30 Days",
        value: Number(chartData?.lastThirtyDaysUsersAddition) || 0,
      },
    ],
    [chartData]
  );

  const activeUsers = useMemo(
    () => [
      { name: "Daily", value: Number(chartData?.dailyActiveUsers) || 0 },
      { name: "Weekly", value: Number(chartData?.weeklyActiveUsers) || 0 },
      { name: "Monthly", value: Number(chartData?.monthlyActiveUsers) || 0 },
    ],
    [chartData]
  );

  const deposits = useMemo(
    () => [
      {
        name: "Metrics",
        totalDepositAmount: Number(chartData?.totalDepositAmount) || 0,
        totalAdminDepositAmount:
          Number(chartData?.totalAdminDepositAmount) || 0,
        totalAdminBonusAmount: Number(chartData?.totalAdminBonusAmount) || 0,
      },
    ],
    [chartData]
  );

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div>
        <h3 className="mb-2 font-semibold">New Users Distribution</h3>
        {newUsers.every((item) => item.value === 0) ? (
          <p className="text-center text-gray-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={newUsers}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#8884d8"
              >
                {newUsers.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div>
        <h3 className="mb-2 font-semibold">Active Users Distribution</h3>
        {activeUsers.every((item) => item.value === 0) ? (
          <p className="text-center text-gray-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activeUsers}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                fill="#82ca9d"
              >
                {activeUsers.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
      <div className="col-span-full">
        <h3 className="mb-2 font-semibold">Deposits and Bonuses Comparison</h3>
        {Object.values(deposits[0])
          .slice(1)
          .every((v) => v === 0) ? (
          <p className="text-center text-gray-500">No data available</p>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={deposits}>
              <defs>
                <linearGradient id="color1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="totalDepositAmount"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#color1)"
              />
              <Area
                type="monotone"
                dataKey="totalAdminDepositAmount"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="#82ca9d"
              />
              <Area
                type="monotone"
                dataKey="totalAdminBonusAmount"
                stroke="#ffc658"
                fillOpacity={1}
                fill="#ffc658"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
