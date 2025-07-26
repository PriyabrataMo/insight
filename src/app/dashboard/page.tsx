"use client";

import { useState, useEffect } from "react";
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
  FileText,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  BarChart3,
  PieChart,
  Home,
  Download,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { ProgressChart } from "@/components/ProgressChart";

export default function Dashboard() {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [timeFilter, setTimeFilter] = useState<"all" | "week" | "month">("all");

  useEffect(() => {
    const saved = localStorage.getItem("actionItems");
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved);
        const itemsWithDates = parsedItems.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setActionItems(itemsWithDates);
      } catch (error) {
        console.error("Error loading saved action items:", error);
      }
    }
  }, []);

  const getFilteredItems = () => {
    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
    const oneMonthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    switch (timeFilter) {
      case "week":
        return actionItems.filter((item) => item.createdAt >= oneWeekAgo);
      case "month":
        return actionItems.filter((item) => item.createdAt >= oneMonthAgo);
      default:
        return actionItems;
    }
  };

  const filteredItems = getFilteredItems();
  const completedItems = filteredItems.filter((item) => item.completed);
  const pendingItems = filteredItems.filter((item) => !item.completed);
  const completionRate =
    filteredItems.length > 0
      ? (completedItems.length / filteredItems.length) * 100
      : 0;

  const exportData = () => {
    const data = {
      exportDate: new Date().toISOString(),
      totalItems: filteredItems.length,
      completedItems: completedItems.length,
      pendingItems: pendingItems.length,
      completionRate: completionRate.toFixed(1),
      items: filteredItems,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meeting-insights-${timeFilter}-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

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
              <span className="text-gray-600 font-medium">Dashboard</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Comprehensive overview of your meeting insights and action items
          </p>
        </div>

        {/* Filter Controls */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Filter className="h-4 w-4 text-gray-500 mr-2" />
              <span className="text-sm text-gray-700 mr-3">Time Period:</span>
            </div>
            <div className="flex space-x-2">
              {(["all", "month", "week"] as const).map((filter) => (
                <Button
                  key={filter}
                  variant={timeFilter === filter ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeFilter(filter)}
                  className="capitalize"
                >
                  {filter === "all" ? "All Time" : `Last ${filter}`}
                </Button>
              ))}
            </div>
          </div>
          <Button onClick={exportData} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
              <FileText className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600">
                {filteredItems.length}
              </div>
              <p className="text-xs text-muted-foreground">
                Action items generated
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {completedItems.length}
              </div>
              <p className="text-xs text-muted-foreground">Tasks finished</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <AlertCircle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-600">
                {pendingItems.length}
              </div>
              <p className="text-xs text-muted-foreground">Tasks remaining</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completion Rate
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {completionRate.toFixed(1)}%
              </div>
              <p className="text-xs text-muted-foreground">Overall progress</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts and Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Progress Chart */}
          <ProgressChart items={filteredItems} />

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                Recent Activity
              </CardTitle>
              <CardDescription>
                Latest action items and completions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredItems.slice(0, 5).map((item) => (
                  <div
                    key={item.id}
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                  >
                    <div
                      className={`p-1 rounded-full ${
                        item.completed ? "bg-green-100" : "bg-orange-100"
                      }`}
                    >
                      {item.completed ? (
                        <CheckCircle className="h-3 w-3 text-green-600" />
                      ) : (
                        <Clock className="h-3 w-3 text-orange-600" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm ${
                          item.completed
                            ? "line-through text-gray-500"
                            : "text-gray-900"
                        }`}
                      >
                        {item.text.substring(0, 80)}...
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.createdAt.toLocaleDateString()} •{" "}
                        {item.createdAt.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                {filteredItems.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No action items found for the selected time period</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
                Productivity Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Average completion time
                  </span>
                  <span className="font-medium">2.3 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Most productive day
                  </span>
                  <span className="font-medium">Tuesday</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Task creation trend
                  </span>
                  <span className="font-medium text-green-600">↗️ +12%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <PieChart className="h-5 w-5 mr-2 text-green-600" />
                Task Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Follow-up tasks</span>
                  <span className="font-medium">45%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Reports & Documentation
                  </span>
                  <span className="font-medium">30%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Meeting Scheduling
                  </span>
                  <span className="font-medium">25%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-lg">
                <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">This week</span>
                  <span className="font-medium text-green-600">
                    +8 completed
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Streak</span>
                  <span className="font-medium">5 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Goal progress</span>
                  <span className="font-medium text-blue-600">67%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
