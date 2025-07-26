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
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Home,
  Search,
  Filter,
  Trash2,
  Download,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";

interface TranscriptSession {
  id: string;
  date: Date;
  itemCount: number;
  completedCount: number;
  items: ActionItem[];
}

export default function History() {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);
  const [sessions, setSessions] = useState<TranscriptSession[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "completed" | "pending"
  >("all");
  const [selectedSession, setSelectedSession] = useState<string | null>(null);

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

        // Group items by date to create sessions
        const groupedSessions = groupItemsByDate(itemsWithDates);
        setSessions(groupedSessions);
      } catch (error) {
        console.error("Error loading saved action items:", error);
      }
    }
  }, []);

  const groupItemsByDate = (items: ActionItem[]): TranscriptSession[] => {
    const grouped = items.reduce((acc, item) => {
      const dateKey = item.createdAt.toDateString();
      if (!acc[dateKey]) {
        acc[dateKey] = [];
      }
      acc[dateKey].push(item);
      return acc;
    }, {} as Record<string, ActionItem[]>);

    return Object.entries(grouped)
      .map(([dateString, items]) => ({
        id: dateString,
        date: new Date(dateString),
        itemCount: items.length,
        completedCount: items.filter((item) => item.completed).length,
        items: items.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        ),
      }))
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  };

  const getFilteredItems = () => {
    let filtered = actionItems;

    if (selectedSession) {
      const session = sessions.find((s) => s.id === selectedSession);
      filtered = session ? session.items : [];
    }

    if (searchTerm) {
      filtered = filtered.filter((item) =>
        item.text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter((item) =>
        statusFilter === "completed" ? item.completed : !item.completed
      );
    }

    return filtered;
  };

  const handleToggleComplete = (id: string) => {
    const updatedItems = actionItems.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    setActionItems(updatedItems);
    localStorage.setItem("actionItems", JSON.stringify(updatedItems));

    // Update sessions
    const updatedSessions = groupItemsByDate(updatedItems);
    setSessions(updatedSessions);
  };

  const handleDelete = (id: string) => {
    const updatedItems = actionItems.filter((item) => item.id !== id);
    setActionItems(updatedItems);
    localStorage.setItem("actionItems", JSON.stringify(updatedItems));

    // Update sessions
    const updatedSessions = groupItemsByDate(updatedItems);
    setSessions(updatedSessions);
  };

  const exportSession = (session: TranscriptSession) => {
    const data = {
      sessionDate: session.date.toISOString(),
      totalItems: session.itemCount,
      completedItems: session.completedCount,
      items: session.items,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `session-${session.date.toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredItems = getFilteredItems();

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
              <span className="text-gray-600 font-medium">History</span>
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
            Task History
          </h1>
          <p className="text-gray-600">
            View and manage your complete action item history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sessions Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2" />
                  Sessions
                </CardTitle>
                <CardDescription>Browse by date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    variant={selectedSession === null ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setSelectedSession(null)}
                    className="w-full justify-start"
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    All Sessions
                  </Button>
                  {sessions.map((session) => (
                    <div key={session.id} className="space-y-1">
                      <Button
                        variant={
                          selectedSession === session.id ? "default" : "ghost"
                        }
                        size="sm"
                        onClick={() => setSelectedSession(session.id)}
                        className="w-full justify-start"
                      >
                        <Calendar className="h-4 w-4 mr-2" />
                        {session.date.toLocaleDateString()}
                      </Button>
                      <div className="ml-6 text-xs text-gray-500 space-y-1">
                        <div className="flex justify-between">
                          <span>Total:</span>
                          <span>{session.itemCount}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Completed:</span>
                          <span className="text-green-600">
                            {session.completedCount}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => exportSession(session)}
                          className="w-full mt-1 h-6 text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Search and Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search action items..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-500" />
                    <select
                      value={statusFilter}
                      onChange={(e) =>
                        setStatusFilter(
                          e.target.value as "all" | "completed" | "pending"
                        )
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="all">All Status</option>
                      <option value="completed">Completed</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results Summary */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Showing {filteredItems.length} of {actionItems.length} action
                items
                {selectedSession && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                    {sessions
                      .find((s) => s.id === selectedSession)
                      ?.date.toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            {/* Action Items List */}
            <div className="space-y-4">
              {filteredItems.length === 0 ? (
                <Card>
                  <CardContent className="py-12">
                    <div className="text-center text-gray-500">
                      <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p className="text-lg mb-2">No action items found</p>
                      <p className="text-sm">
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className={`transition-all hover:shadow-md ${
                      item.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-white"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <Checkbox
                          checked={item.completed}
                          onCheckedChange={() => handleToggleComplete(item.id)}
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm ${
                              item.completed
                                ? "line-through text-gray-500"
                                : "text-gray-900"
                            }`}
                          >
                            {item.text}
                          </p>
                          <div className="flex items-center mt-2 text-xs text-gray-500 space-x-4">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {item.createdAt.toLocaleDateString()}
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {item.createdAt.toLocaleTimeString()}
                            </div>
                            <div className="flex items-center">
                              {item.completed ? (
                                <>
                                  <CheckCircle className="h-3 w-3 mr-1 text-green-600" />
                                  <span className="text-green-600">
                                    Completed
                                  </span>
                                </>
                              ) : (
                                <>
                                  <AlertCircle className="h-3 w-3 mr-1 text-orange-600" />
                                  <span className="text-orange-600">
                                    Pending
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
