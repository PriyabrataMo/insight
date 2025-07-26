export interface ActionItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

export interface TranscriptSubmission {
  transcript: string;
  timestamp: Date;
}
