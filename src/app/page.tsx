"use client";

import { useState, useEffect } from "react";
import { ActionItem } from "@/types";
import { TranscriptForm } from "@/components/TranscriptForm";
import { ActionItemsList } from "@/components/ActionItemsList";
import { ProgressChart } from "@/components/ProgressChart";
import { Brain, FileText, Plus, History, Settings, User } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [actionItems, setActionItems] = useState<ActionItem[]>([]);

  // Load saved action items from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("actionItems");
    if (saved) {
      try {
        const parsedItems = JSON.parse(saved);
        // Convert date strings back to Date objects
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

  // Save action items to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("actionItems", JSON.stringify(actionItems));
  }, [actionItems]);

  const handleActionItemsGenerated = (newItems: string[]) => {
    const items: ActionItem[] = newItems.map((text) => ({
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    }));

    setActionItems((prev) => [...items, ...prev]);
  };

  const handleToggleComplete = (id: string) => {
    setActionItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleDelete = (id: string) => {
    setActionItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg mr-4">
                  <Brain className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-black text-gray-900">
                    Meeting Insight
                  </h1>
                  <p className="text-xs text-gray-600 font-medium">
                    AI-Powered Task Generation
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Link
                href="/dashboard"
                className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <Settings className="h-5 w-5 mr-2" />
                Dashboard
              </Link>
              <Link
                href="/history"
                className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <History className="h-5 w-5 mr-2" />
                History
              </Link>
              <Link
                href="/profile"
                className="flex items-center px-4 py-2.5 text-sm font-bold text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-200 hover:scale-105"
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex flex-col lg:flex-row items-center justify-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-6 rounded-2xl shadow-2xl mb-6 lg:mb-0 lg:mr-8 transform hover:scale-105 transition-transform duration-300">
              <Brain className="h-16 w-16 text-white" />
            </div>
            <div className="text-left lg:text-left">
              <h1 className="text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent mb-4 leading-tight">
                Meeting Insight
              </h1>
              <div className="flex items-center justify-center lg:justify-start text-blue-600 mb-2">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <span className="text-2xl font-bold tracking-wide">
                  AI-Powered Task Generation
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        {actionItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl shadow-lg border border-blue-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-blue-700 uppercase tracking-wider mb-2">
                    Total Tasks
                  </p>
                  <p className="text-4xl font-black text-blue-800">
                    {actionItems.length}
                  </p>
                </div>
                <div className="bg-blue-200 p-4 rounded-xl shadow-inner">
                  <FileText className="h-8 w-8 text-blue-700" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-8 rounded-2xl shadow-lg border border-green-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-green-700 uppercase tracking-wider mb-2">
                    Completed
                  </p>
                  <p className="text-4xl font-black text-green-800">
                    {actionItems.filter((item) => item.completed).length}
                  </p>
                </div>
                <div className="bg-green-200 p-4 rounded-xl shadow-inner">
                  <Plus className="h-8 w-8 text-green-700" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-8 rounded-2xl shadow-lg border border-orange-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-orange-700 uppercase tracking-wider mb-2">
                    Pending
                  </p>
                  <p className="text-4xl font-black text-orange-800">
                    {actionItems.filter((item) => !item.completed).length}
                  </p>
                </div>
                <div className="bg-orange-200 p-4 rounded-xl shadow-inner">
                  <History className="h-8 w-8 text-orange-700" />
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl shadow-lg border border-purple-200 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-purple-700 uppercase tracking-wider mb-2">
                    Completion Rate
                  </p>
                  <p className="text-4xl font-black text-purple-800">
                    {actionItems.length > 0
                      ? Math.round(
                          (actionItems.filter((item) => item.completed).length /
                            actionItems.length) *
                            100
                        )
                      : 0}
                    %
                  </p>
                </div>
                <div className="bg-purple-200 p-4 rounded-xl shadow-inner">
                  <Brain className="h-8 w-8 text-purple-700" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Left Column - Form and Quick Actions */}
          <div className="xl:col-span-2 space-y-8">
            <TranscriptForm
              onActionItemsGenerated={handleActionItemsGenerated}
            />

            {/* Quick Actions */}
          </div>

          {/* Right Column - Progress Chart */}
          <div className="xl:col-span-1">
            <ProgressChart items={actionItems} />
          </div>
        </div>

        {/* Action Items List - Full Width */}
        <div className="mt-8 max-w-7xl mx-auto">
          <ActionItemsList
            items={actionItems}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDelete}
          />
        </div>

        {/* Footer */}
        <footer className="mt-20 bg-gradient-to-r from-gray-50 to-blue-50/30 rounded-2xl p-8 text-center border border-gray-200">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-xl shadow-lg mr-4">
              <FileText className="h-6 w-6 text-white" />
            </div>
            <div className="text-left">
              <span className="text-lg font-bold text-gray-900 block">
                Powered by Google Gemini AI
              </span>
              <span className="text-sm text-gray-600 font-medium">
                Built with Next.js & Tailwind CSS
              </span>
            </div>
          </div>
          <p className="text-base text-gray-700 mb-6 font-medium max-w-2xl mx-auto leading-relaxed">
            Submit meeting transcripts to automatically generate and track
            action items with cutting-edge artificial intelligence
          </p>
          <div className="flex flex-wrap items-center justify-center space-x-8 text-sm font-medium">
            <Link
              href="/privacy"
              className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
            >
              Terms of Service
            </Link>
            <Link
              href="/support"
              className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
            >
              Support
            </Link>
          </div>
        </footer>
      </div>
    </div>
  );
}
