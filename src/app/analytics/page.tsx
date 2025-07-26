"use client";

import { useState } from "react";
import { ActionItem } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Brain,
  TrendingUp,
  Calendar,
  Clock,
  Target,
  Home,
  Filter,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react";
import Link from "next/link";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";

interface AnalyticsData {
  dailyCompletion: Array<{ date: string; completed: number; created: number }>;
  weeklyStats: Array<{ week: string; productivity: number }>;
  categoryBreakdown: Array<{
    category: string;
    count: number;
    percentage: number;
  }>;
  timePatterns: Array<{ hour: number; count: number }>;
}

export default function Analytics() {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    dailyCompletion: [],
    weeklyStats: [],
    categoryBreakdown: [],
    timePatterns: [],
  });
  const [timeRange, setTimeRange] = useState<"week" | "month" | "quarter">(
    "month"
  );

  const generateAnalytics = (items: ActionItem[]) => {
    const now = new Date();
    const startDate = getStartDate(timeRange);
    const filteredItems = items.filter((item) => item.createdAt >= startDate);

    // Daily completion data
    const dailyData = generateDailyData(filteredItems, startDate, now);

    // Weekly productivity stats
    const weeklyData = generateWeeklyData(filteredItems);

    // Category breakdown (simplified)
    const categories = categorizeTasks(filteredItems);

    // Time patterns
    const timePatterns = generateTimePatterns(filteredItems);

    setAnalytics({
      dailyCompletion: dailyData,
      weeklyStats: weeklyData,
      categoryBreakdown: categories,
      timePatterns: timePatterns,
    });
  };

  const getStartDate = (range: "week" | "month" | "quarter") => {
    const now = new Date();
    switch (range) {
      case "week":
        return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      case "month":
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
      case "quarter":
        return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
      default:
        return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }
  };

  const generateDailyData = (
    items: ActionItem[],
    startDate: Date,
    endDate: Date
  ) => {
    const days: Record<string, { completed: number; created: number }> = {};

    // Initialize all days
    for (
      let d = new Date(startDate);
      d <= endDate;
      d.setDate(d.getDate() + 1)
    ) {
      const dateStr = d.toISOString().split("T")[0];
      days[dateStr] = { completed: 0, created: 0 };
    }

    // Count created items
    items.forEach((item) => {
      const dateStr = item.createdAt.toISOString().split("T")[0];
      if (days[dateStr]) {
        days[dateStr].created++;
        if (item.completed) {
          days[dateStr].completed++;
        }
      }
    });

    return Object.entries(days).map(([date, data]) => ({
      date: new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      ...data,
    }));
  };

  const generateWeeklyData = (items: ActionItem[]) => {
    const weeks: Record<string, number> = {};
    const now = new Date();

    for (let i = 0; i < 4; i++) {
      const weekStart = new Date(
        now.getTime() - (i + 1) * 7 * 24 * 60 * 60 * 1000
      );
      const weekEnd = new Date(now.getTime() - i * 7 * 24 * 60 * 60 * 1000);
      const weekStr = `Week ${4 - i}`;

      const weekItems = items.filter(
        (item) => item.createdAt >= weekStart && item.createdAt < weekEnd
      );

      const productivity =
        weekItems.length > 0
          ? (weekItems.filter((item) => item.completed).length /
              weekItems.length) *
            100
          : 0;

      weeks[weekStr] = Math.round(productivity);
    }

    return Object.entries(weeks).map(([week, productivity]) => ({
      week,
      productivity,
    }));
  };

  const categorizeTasks = (items: ActionItem[]) => {
    const categories: Record<string, number> = {
      "Follow-up": 0,
      Reports: 0,
      Meetings: 0,
      Development: 0,
      Other: 0,
    };

    items.forEach((item) => {
      const text = item.text.toLowerCase();
      if (
        text.includes("follow") ||
        text.includes("contact") ||
        text.includes("reach out")
      ) {
        categories["Follow-up"]++;
      } else if (
        text.includes("report") ||
        text.includes("document") ||
        text.includes("write")
      ) {
        categories["Reports"]++;
      } else if (
        text.includes("meeting") ||
        text.includes("schedule") ||
        text.includes("call")
      ) {
        categories["Meetings"]++;
      } else if (
        text.includes("develop") ||
        text.includes("code") ||
        text.includes("build")
      ) {
        categories["Development"]++;
      } else {
        categories["Other"]++;
      }
    });

    const total = Object.values(categories).reduce(
      (sum, count) => sum + count,
      0
    );

    return Object.entries(categories)
      .filter(([_, count]) => count > 0)
      .map(([category, count]) => ({
        category,
        count,
        percentage: total > 0 ? Math.round((count / total) * 100) : 0,
      }));
  };

  const generateTimePatterns = (items: ActionItem[]) => {
    const hours: Record<number, number> = {};

    // Initialize hours
    for (let i = 0; i < 24; i++) {
      hours[i] = 0;
    }

    items.forEach((item) => {
      const hour = item.createdAt.getHours();
      hours[hour]++;
    });

    return Object.entries(hours)
      .map(([hour, count]) => ({
        hour: parseInt(hour),
        count,
      }))
      .filter((item) => item.count > 0)
      .slice(0, 12); // Show top 12 hours
  };

  const totalTasks = actionItems.length;
  const completedTasks = actionItems.filter((item) => item.completed).length;
  const completionRate =
    totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
  const avgTasksPerDay =
    analytics.dailyCompletion.length > 0
      ? analytics.dailyCompletion.reduce((sum, day) => sum + day.created, 0) /
        analytics.dailyCompletion.length
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Brain className="h-6 w-6 text-blue-600" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">
                  Meeting Insight
                </h1>
              </Link>
              <span className="text-gray-400">•</span>
              <span className="text-gray-600 font-medium">Analytics</span>
            </div>
            <Link
              href="/"
              className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </Link>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600">
            Detailed insights into your productivity and task patterns
          </p>
        </div>

        {/* Time Range Filter */}
        <div className="mb-8 flex items-center space-x-4">
          <div className="flex items-center">
            <Filter className="h-4 w-4 text-gray-500 mr-2" />
            <span className="text-sm text-gray-700 mr-3">Time Range:</span>
          </div>
          <div className="flex space-x-2">
            {(["week", "month", "quarter"] as const).map((range) => (
              <Button
                key={range}
                variant={timeRange === range ? "default" : "outline"}
                size="sm"
                onClick={() => setTimeRange(range)}
                className="capitalize"
              >
                {range === "quarter" ? "3 Months" : `Last ${range}`}
              </Button>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <Target className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {totalTasks}
              </div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">
                Overall performance
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg Tasks/Day
              </CardTitle>
              <Calendar className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {avgTasksPerDay.toFixed(1)}
              </div>
              <p className="text-xs text-muted-foreground">Recent activity</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Streak
              </CardTitle>
              <Activity className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">5</div>
              <p className="text-xs text-muted-foreground">Days active</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Daily Activity Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Daily Activity
              </CardTitle>
              <CardDescription>
                Tasks created vs completed over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={analytics.dailyCompletion}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="created"
                      stackId="1"
                      stroke="#3b82f6"
                      fill="#dbeafe"
                      name="Created"
                    />
                    <Area
                      type="monotone"
                      dataKey="completed"
                      stackId="2"
                      stroke="#10b981"
                      fill="#d1fae5"
                      name="Completed"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Weekly Productivity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Weekly Productivity
              </CardTitle>
              <CardDescription>Completion rate by week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analytics.weeklyStats}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip
                      formatter={(value) => [`${value}%`, "Completion Rate"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="productivity"
                      stroke="#8b5cf6"
                      strokeWidth={3}
                      dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Category and Time Analysis */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Task Categories */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <PieChart className="h-5 w-5 mr-2" />
                Task Categories
              </CardTitle>
              <CardDescription>Breakdown of task types</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analytics.categoryBreakdown.map((category, index) => (
                  <div
                    key={category.category}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div
                        className="w-3 h-3 rounded-full mr-3"
                        style={{
                          backgroundColor: `hsl(${index * 60}, 70%, 50%)`,
                        }}
                      />
                      <span className="text-sm font-medium">
                        {category.category}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">
                        {category.count}
                      </span>
                      <span className="text-sm font-medium">
                        {category.percentage}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Time Patterns */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Activity Patterns
              </CardTitle>
              <CardDescription>When you create most tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.timePatterns}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="hour"
                      tickFormatter={(hour: number) => `${hour}:00`}
                    />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [`${value} tasks`, "Created"]}
                      labelFormatter={(hour) => `${hour}:00`}
                    />
                    <Bar dataKey="count" fill="#f59e0b" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
