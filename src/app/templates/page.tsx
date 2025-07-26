"use client";

import { useState } from "react";
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
  FileText,
  Copy,
  Home,
  Plus,
  Briefcase,
  Users,
  Target,
  Calendar,
} from "lucide-react";
import Link from "next/link";

interface Template {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string;
  icon: React.ReactNode;
}

const templates: Template[] = [
  {
    id: "weekly-standup",
    title: "Weekly Team Standup",
    description: "Template for regular team standup meetings",
    category: "Team Meetings",
    icon: <Users className="h-5 w-5" />,
    content: `Team Standup - [Date]

Attendees: [List team members]

Last Week's Accomplishments:
- [Team Member 1]: Completed project X, worked on feature Y
- [Team Member 2]: Fixed bugs in module Z, reviewed PRs
- [Team Member 3]: Met with stakeholders, updated documentation

This Week's Goals:
- [Team Member 1]: Will focus on implementing new API endpoints
- [Team Member 2]: Will work on testing framework improvements
- [Team Member 3]: Will prepare presentation for client demo

Blockers/Issues:
- Need approval for budget increase
- Waiting for feedback from design team
- Server capacity concerns for upcoming launch

Action Items:
- John will follow up with procurement team about budget by Friday
- Sarah will schedule design review meeting this week
- Mike will investigate server scaling options and provide report by Wednesday`,
  },
  {
    id: "project-kickoff",
    title: "Project Kickoff Meeting",
    description: "Comprehensive template for starting new projects",
    category: "Project Management",
    icon: <Target className="h-5 w-5" />,
    content: `Project Kickoff Meeting - [Project Name]
Date: [Date]
Attendees: [List stakeholders and team members]

Project Overview:
- Project Goal: [Brief description of project objectives]
- Timeline: [Start date] to [End date]
- Budget: [Budget information]
- Success Criteria: [How success will be measured]

Team Roles & Responsibilities:
- Project Manager: [Name] - Overall coordination and timeline management
- Lead Developer: [Name] - Technical leadership and architecture decisions
- Designer: [Name] - UI/UX design and user experience
- QA Lead: [Name] - Testing strategy and quality assurance

Key Milestones:
1. Requirements gathering - [Date]
2. Design phase completion - [Date]
3. Development phase 1 - [Date]
4. Testing and QA - [Date]
5. Deployment - [Date]

Immediate Action Items:
- [PM] will set up project repository and tools by [Date]
- [Lead Dev] will create technical specification document by [Date]
- [Designer] will conduct user research and create wireframes by [Date]
- [QA] will develop testing strategy and plan by [Date]
- All team members will review and approve project charter by [Date]`,
  },
  {
    id: "client-meeting",
    title: "Client Meeting",
    description: "Professional template for client interactions",
    category: "Client Relations",
    icon: <Briefcase className="h-5 w-5" />,
    content: `Client Meeting - [Client Name]
Date: [Date]
Attendees: [Client representatives and internal team]

Meeting Agenda:
1. Project status update
2. Recent deliverables review
3. Upcoming milestones discussion
4. Client feedback and requests
5. Next steps and timeline

Project Status Update:
- Completed work since last meeting: [List recent accomplishments]
- Current progress: [Percentage complete and current phase]
- Upcoming deliverables: [What will be delivered next]

Client Feedback:
- [Positive feedback received]
- [Concerns or issues raised]
- [Change requests or new requirements]

Decisions Made:
- [Decision 1]: [Details and rationale]
- [Decision 2]: [Details and rationale]

Action Items:
- [Internal team] will provide revised timeline by [Date]
- [Client] will review and approve design mockups by [Date]
- [Account Manager] will schedule follow-up meeting for [Date]
- [Technical Lead] will prepare demo for next review session`,
  },
  {
    id: "quarterly-review",
    title: "Quarterly Business Review",
    description: "Strategic planning and performance review template",
    category: "Strategic Planning",
    icon: <Calendar className="h-5 w-5" />,
    content: `Quarterly Business Review - Q[Number] [Year]
Date: [Date]
Attendees: [Leadership team and key stakeholders]

Previous Quarter Performance:
- Revenue: [Actual vs Target]
- Key Metrics: [Performance indicators]
- Major Achievements: [Significant accomplishments]
- Challenges Faced: [Issues and how they were addressed]

Current Quarter Goals:
- Revenue Targets: [Financial objectives]
- Strategic Initiatives: [Major projects and focus areas]
- Team Development: [Hiring and training plans]
- Process Improvements: [Operational enhancements]

Market Analysis:
- Industry Trends: [Relevant market developments]
- Competitive Landscape: [Competitor analysis]
- Opportunities: [Growth potential areas]
- Threats: [Risk factors to monitor]

Action Items for Next Quarter:
- [Leadership] will finalize budget allocation for new initiatives by [Date]
- [Sales Team] will develop go-to-market strategy for new product by [Date]
- [Operations] will implement new customer service platform by [Date]
- [HR] will complete hiring for critical positions by [Date]`,
  },
];

export default function Templates() {
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (content: string, templateId: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(templateId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const categories = Array.from(new Set(templates.map((t) => t.category)));

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
              <span className="text-gray-600 font-medium">Templates</span>
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
            Meeting Templates
          </h1>
          <p className="text-gray-600">
            Pre-built templates to help you structure effective meetings
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Templates List */}
          <div className="lg:col-span-1 space-y-6">
            {categories.map((category) => (
              <div key={category}>
                <h3 className="font-semibold text-gray-900 mb-3">{category}</h3>
                <div className="space-y-2">
                  {templates
                    .filter((t) => t.category === category)
                    .map((template) => (
                      <Card
                        key={template.id}
                        className={`cursor-pointer transition-all hover:shadow-md ${
                          selectedTemplate?.id === template.id
                            ? "ring-2 ring-blue-500 bg-blue-50"
                            : ""
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <CardHeader className="pb-3">
                          <div className="flex items-center space-x-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                              {template.icon}
                            </div>
                            <div>
                              <CardTitle className="text-sm">
                                {template.title}
                              </CardTitle>
                              <CardDescription className="text-xs">
                                {template.description}
                              </CardDescription>
                            </div>
                          </div>
                        </CardHeader>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>

          {/* Template Preview */}
          <div className="lg:col-span-2">
            {selectedTemplate ? (
              <Card className="h-fit">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                        {selectedTemplate.icon}
                      </div>
                      <div>
                        <CardTitle>{selectedTemplate.title}</CardTitle>
                        <CardDescription>
                          {selectedTemplate.description}
                        </CardDescription>
                      </div>
                    </div>
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          selectedTemplate.content,
                          selectedTemplate.id
                        )
                      }
                      size="sm"
                      className="shrink-0"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedId === selectedTemplate.id ? "Copied!" : "Copy"}
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Template Content
                    </label>
                    <Textarea
                      value={selectedTemplate.content}
                      readOnly
                      rows={20}
                      className="font-mono text-sm"
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      onClick={() =>
                        copyToClipboard(
                          selectedTemplate.content,
                          selectedTemplate.id
                        )
                      }
                      variant="outline"
                      className="flex-1"
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      {copiedId === selectedTemplate.id
                        ? "Copied to Clipboard!"
                        : "Copy Template"}
                    </Button>
                    <Link href="/" className="flex-1">
                      <Button className="w-full">
                        <Plus className="h-4 w-4 mr-2" />
                        Use Template
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="h-96 flex items-center justify-center">
                <CardContent className="text-center">
                  <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Select a Template
                  </h3>
                  <p className="text-gray-600">
                    Choose a meeting template from the list to preview and copy
                    its content
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Usage Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>How to Use Templates</CardTitle>
            <CardDescription>
              Make the most of these meeting templates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-blue-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-medium mb-2">Select Template</h4>
                <p className="text-sm text-gray-600">
                  Choose a template that matches your meeting type
                </p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-green-600 font-bold">2</span>
                </div>
                <h4 className="font-medium mb-2">Customize Content</h4>
                <p className="text-sm text-gray-600">
                  Copy the template and fill in your specific details
                </p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 p-3 rounded-full w-12 h-12 mx-auto mb-3 flex items-center justify-center">
                  <span className="text-purple-600 font-bold">3</span>
                </div>
                <h4 className="font-medium mb-2">Generate Tasks</h4>
                <p className="text-sm text-gray-600">
                  Use the filled template to generate action items with AI
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
