import { NextRequest, NextResponse } from "next/server";
import { generateActionItems } from "@/lib/gemini";

export async function POST(request: NextRequest) {
  try {
    const { transcript } = await request.json();

    if (!transcript || typeof transcript !== "string") {
      return NextResponse.json(
        { error: "Invalid transcript provided" },
        { status: 400 }
      );
    }

    if (transcript.trim().length < 10) {
      return NextResponse.json(
        {
          error: "Transcript is too short to generate meaningful action items",
        },
        { status: 400 }
      );
    }

    const actionItems = await generateActionItems(transcript);

    return NextResponse.json({ actionItems });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Failed to generate action items" },
      { status: 500 }
    );
  }
}
