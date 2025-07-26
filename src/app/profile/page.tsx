"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Brain,
  User,
  Settings,
  Key,
  Bell,
  Palette,
  Download,
  Upload,
  Trash2,
  Home,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";
import Link from "next/link";

interface UserPreferences {
  name: string;
  email: string;
  notifications: {
    taskCompletion: boolean;
    dailyReminders: boolean;
    weeklyReports: boolean;
  };
  geminiApiKey: string;
  theme: "light" | "dark" | "system";
  defaultPrompt: string;
}

export default function Profile() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    name: "",
    email: "",
    notifications: {
      taskCompletion: true,
      dailyReminders: false,
      weeklyReports: true,
    },
    geminiApiKey: "",
    theme: "system",
    defaultPrompt: `Analyze the following meeting transcript and extract actionable tasks. 
Return ONLY a JSON array of strings, where each string is a specific, actionable task.
Each task should be clear, concise, and include who should do it if mentioned.`,
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Load preferences from localStorage
    const savedPrefs = localStorage.getItem("userPreferences");
    if (savedPrefs) {
      try {
        const parsed = JSON.parse(savedPrefs);
        setPreferences((prev) => ({ ...prev, ...parsed }));
      } catch (error) {
        console.error("Error loading preferences:", error);
      }
    }

    // Load API key from environment or localStorage
    const apiKey =
      process.env.NEXT_PUBLIC_GEMINI_API_KEY ||
      localStorage.getItem("geminiApiKey") ||
      "";
    setPreferences((prev) => ({ ...prev, geminiApiKey: apiKey }));
  }, []);

  const handleSave = () => {
    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    if (preferences.geminiApiKey) {
      localStorage.setItem("geminiApiKey", preferences.geminiApiKey);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const exportData = () => {
    const actionItems = localStorage.getItem("actionItems");
    const userPrefs = localStorage.getItem("userPreferences");

    const exportData = {
      exportDate: new Date().toISOString(),
      actionItems: actionItems ? JSON.parse(actionItems) : [],
      preferences: userPrefs ? JSON.parse(userPrefs) : {},
      version: "1.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `meeting-insight-backup-${
      new Date().toISOString().split("T")[0]
    }.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);

        if (data.actionItems) {
          localStorage.setItem("actionItems", JSON.stringify(data.actionItems));
        }

        if (data.preferences) {
          localStorage.setItem(
            "userPreferences",
            JSON.stringify(data.preferences)
          );
          setPreferences((prev) => ({ ...prev, ...data.preferences }));
        }

        alert(
          "Data imported successfully! Please refresh the page to see changes."
        );
      } catch (error) {
        alert("Error importing data. Please check the file format.");
      }
    };
    reader.readAsText(file);
  };

  const clearAllData = () => {
    if (
      confirm(
        "Are you sure you want to clear all data? This action cannot be undone."
      )
    ) {
      localStorage.removeItem("actionItems");
      localStorage.removeItem("userPreferences");
      localStorage.removeItem("geminiApiKey");
      setPreferences({
        name: "",
        email: "",
        notifications: {
          taskCompletion: true,
          dailyReminders: false,
          weeklyReports: true,
        },
        geminiApiKey: "",
        theme: "system",
        defaultPrompt: `Analyze the following meeting transcript and extract actionable tasks. 
Return ONLY a JSON array of strings, where each string is a specific, actionable task.
Each task should be clear, concise, and include who should do it if mentioned.`,
      });
      alert("All data cleared successfully!");
    }
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
              <span className="text-gray-600 font-medium">
                Profile & Settings
              </span>
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Profile & Settings
          </h1>
          <p className="text-gray-600">
            Manage your account preferences and application settings
          </p>
        </div>

        <div className="space-y-8">
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    value={preferences.name}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={preferences.email}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* API Configuration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Configuration
              </CardTitle>
              <CardDescription>
                Configure your Google Gemini API settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Google Gemini API Key
                </label>
                <div className="flex space-x-2">
                  <div className="flex-1 relative">
                    <input
                      type={showApiKey ? "text" : "password"}
                      value={preferences.geminiApiKey}
                      onChange={(e) =>
                        setPreferences((prev) => ({
                          ...prev,
                          geminiApiKey: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your Gemini API key"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setShowApiKey(!showApiKey)}
                  >
                    {showApiKey ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Get your API key from{" "}
                  <a
                    href="https://makersuite.google.com/app/apikey"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    Google AI Studio
                  </a>
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom AI Prompt
                </label>
                <Textarea
                  value={preferences.defaultPrompt}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      defaultPrompt: e.target.value,
                    }))
                  }
                  rows={6}
                  className="w-full"
                  placeholder="Enter your custom prompt for AI processing..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  This prompt will be used when processing meeting transcripts
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.taskCompletion}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          taskCompletion: e.target.checked,
                        },
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Task completion notifications
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.dailyReminders}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          dailyReminders: e.target.checked,
                        },
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Daily task reminders
                  </span>
                </label>

                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={preferences.notifications.weeklyReports}
                    onChange={(e) =>
                      setPreferences((prev) => ({
                        ...prev,
                        notifications: {
                          ...prev.notifications,
                          weeklyReports: e.target.checked,
                        },
                      }))
                    }
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">
                    Weekly progress reports
                  </span>
                </label>
              </div>
            </CardContent>
          </Card>

          {/* Theme */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Appearance
              </CardTitle>
              <CardDescription>
                Customize the application appearance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <select
                  value={preferences.theme}
                  onChange={(e) =>
                    setPreferences((prev) => ({
                      ...prev,
                      theme: e.target.value as "light" | "dark" | "system",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                Data Management
              </CardTitle>
              <CardDescription>
                Import, export, or clear your data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={exportData}
                  variant="outline"
                  className="w-full"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>

                <div className="relative">
                  <input
                    type="file"
                    accept=".json"
                    onChange={importData}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button variant="outline" className="w-full">
                    <Upload className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </div>

                <Button
                  onClick={clearAllData}
                  variant="destructive"
                  className="w-full"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Export includes all action items and preferences. Import will
                overwrite existing data.
              </p>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="lg" className="min-w-[120px]">
              <Save className="h-4 w-4 mr-2" />
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
