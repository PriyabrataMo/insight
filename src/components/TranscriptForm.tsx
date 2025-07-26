"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Sparkles, FileText, Zap } from "lucide-react";

interface TranscriptFormProps {
  onActionItemsGenerated: (items: string[]) => void;
}

export function TranscriptForm({
  onActionItemsGenerated,
}: TranscriptFormProps) {
  const [transcript, setTranscript] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!transcript.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/generate-action-items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ transcript }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate action items");
      }

      const data = await response.json();
      onActionItemsGenerated(data.actionItems);
      setTranscript("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-2xl border-0 bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm">
      <CardHeader className="pb-6">
        <div className="flex items-center space-x-3 mb-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Submit Meeting Transcript
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 mt-1">
              Paste your meeting transcript below and we'll generate actionable
              tasks using AI.
            </CardDescription>
          </div>
        </div>
        <div className="flex items-center space-x-4 mt-4 text-sm text-gray-600">
          <div className="flex items-center">
            <Sparkles className="h-4 w-4 text-yellow-500 mr-1" />
            AI-Powered
          </div>
          <div className="flex items-center">
            <Zap className="h-4 w-4 text-blue-500 mr-1" />
            Instant Results
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <Textarea
              placeholder="Paste your meeting transcript here... 

Example: 
'John mentioned he will send the quarterly report by Friday. Sarah agreed to schedule a follow-up meeting with the client. The team decided to review the budget proposal and provide feedback by next Tuesday.'"
              value={transcript}
              onChange={(e) => setTranscript(e.target.value)}
              rows={10}
              className="min-h-[250px] text-black leading-relaxed resize-none border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded-xl shadow-inner bg-white/80 backdrop-blur-sm"
            />
            <div className="absolute bottom-4 right-4 text-xs text-gray-400">
              {transcript.length} characters
            </div>
          </div>
          {error && (
            <div className="text-sm text-red-700 bg-red-50 border border-red-200 p-4 rounded-xl flex items-start space-x-2">
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center mt-0.5">
                <span className="text-white text-xs font-bold">!</span>
              </div>
              <span>{error}</span>
            </div>
          )}
          <Button
            type="submit"
            disabled={!transcript.trim() || isLoading}
            className="w-full h-14 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] transition-all duration-200 rounded-xl"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                Generating Action Items...
              </>
            ) : (
              <>
                <Sparkles className="mr-3 h-6 w-6" />
                Generate Action Items
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
