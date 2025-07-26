"use client";

import { ActionItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trash2, CheckCircle, Clock, Calendar, Target } from "lucide-react";

interface ActionItemsListProps {
  items: ActionItem[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ActionItemsList({
  items,
  onToggleComplete,
  onDelete,
}: ActionItemsListProps) {
  if (items.length === 0) {
    return (
      <Card className="w-full shadow-xl border-0 bg-gradient-to-br from-white to-gray-50/50">
        <CardContent className="py-16">
          <div className="text-center">
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-8 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Target className="h-12 w-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Ready to Get Started?
            </h3>
            <p className="text-lg text-gray-600">
              No action items yet. Submit a meeting transcript above to
              automatically generate your first set of tasks!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const completedCount = items.filter((item) => item.completed).length;
  const pendingCount = items.length - completedCount;

  return (
    <Card className="w-full shadow-2xl border-0 bg-gradient-to-br from-white to-gray-50/30 backdrop-blur-sm">
      <CardHeader className="pb-6 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-blue-600 p-3 rounded-xl shadow-lg">
              <Target className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Action Items
            </CardTitle>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center bg-green-50 px-4 py-2 rounded-full border border-green-200">
              <CheckCircle className="h-5 w-5 mr-2 text-green-600" />
              <span className="font-bold text-green-800">{completedCount}</span>
              <span className="text-green-600 ml-1">completed</span>
            </div>
            <div className="flex items-center bg-orange-50 px-4 py-2 rounded-full border border-orange-200">
              <Clock className="h-5 w-5 mr-2 text-orange-600" />
              <span className="font-bold text-orange-800">{pendingCount}</span>
              <span className="text-orange-600 ml-1">pending</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`group relative flex items-start space-x-4 p-6 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                item.completed
                  ? "bg-gradient-to-r from-green-50 to-green-100 border-green-200 hover:border-green-300"
                  : "bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 hover:border-blue-300 hover:shadow-blue-100"
              }`}
            >
              <div className="flex-shrink-0 mt-1">
                <Checkbox
                  checked={item.completed}
                  onCheckedChange={() => onToggleComplete(item.id)}
                  className="w-6 h-6 border-2 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        #{String(index + 1).padStart(2, "0")}
                      </span>
                      {item.completed && (
                        <span className="text-xs font-bold text-green-700 bg-green-200 px-3 py-1 rounded-full">
                          COMPLETED
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-lg font-medium leading-relaxed ${
                        item.completed
                          ? "line-through text-gray-500"
                          : "text-gray-900"
                      }`}
                    >
                      {item.text}
                    </p>
                    <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>
                          {item.createdAt.toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>
                          {item.createdAt.toLocaleTimeString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(item.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl p-3"
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
