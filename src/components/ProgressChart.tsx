"use client";

import { ActionItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { TrendingUp, BarChart3, Award } from "lucide-react";

interface ProgressChartProps {
  items: ActionItem[];
}

export function ProgressChart({ items }: ProgressChartProps) {
  const completedCount = items.filter((item) => item.completed).length;
  const pendingCount = items.length - completedCount;

  const data = [
    {
      name: "Completed",
      value: completedCount,
      color: "#10b981",
    },
    {
      name: "Pending",
      value: pendingCount,
      color: "#f59e0b",
    },
  ];

  const COLORS = {
    Completed: "#10b981",
    Pending: "#f59e0b",
  };

  if (items.length === 0) {
    return (
      <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/30">
        <CardHeader className="pb-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg">
              <BarChart3 className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Progress Overview
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[350px] flex flex-col items-center justify-center text-center">
            <div className="bg-gradient-to-br from-gray-100 to-gray-200 p-8 rounded-full mb-6">
              <TrendingUp className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No Data Yet
            </h3>
            <p className="text-gray-600">
              Complete some tasks to see your progress!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completionPercentage =
    items.length > 0 ? Math.round((completedCount / items.length) * 100) : 0;

  return (
    <Card className="w-full shadow-2xl border-0 bg-gradient-to-br from-white to-purple-50/30 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl shadow-lg">
            <BarChart3 className="h-6 w-6 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Progress Overview
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[320px] mb-6">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, value, percent }) =>
                  `${name}: ${value} (${((percent || 0) * 100).toFixed(0)}%)`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                stroke="#fff"
                strokeWidth={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "none",
                  borderRadius: "12px",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="text-center mb-6">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-lg">
            <div className="flex items-center justify-center mb-2">
              <Award className="h-8 w-8 mr-2" />
              <span className="text-4xl font-black">
                {completionPercentage}%
              </span>
            </div>
            <div className="text-lg font-medium opacity-90">
              Overall Completion Rate
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-2xl border-2 border-green-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-black text-green-800 mb-1">
                {completedCount}
              </div>
              <div className="text-sm font-bold text-green-600 uppercase tracking-wider">
                Completed
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 shadow-lg">
            <div className="text-center">
              <div className="text-3xl font-black text-orange-800 mb-1">
                {pendingCount}
              </div>
              <div className="text-sm font-bold text-orange-600 uppercase tracking-wider">
                Pending
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
