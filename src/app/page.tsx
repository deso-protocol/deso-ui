'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, Zap, Database, Palette, Code } from "lucide-react";

export default function Home() {
  const phase1Tasks = [
    { name: "Next.js 15 + React 19 + TypeScript", completed: true },
    { name: "Tailwind CSS + shadcn/ui", completed: true },
    { name: "React Query + Apollo GraphQL", completed: true },
    { name: "DeSo Protocol SDK", completed: true },
    { name: "Zod Type Validation", completed: true },
    { name: "Project Structure", completed: true },
  ];

  const upcomingPhases = [
    { phase: "Phase 2", name: "Atomic Components", icon: Palette },
    { phase: "Phase 3", name: "Molecular Components", icon: Code },
    { phase: "Phase 4", name: "Organism Components", icon: Database },
    { phase: "Phase 5", name: "Template Components", icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            DeSo UI Library
          </h1>
          <p className="text-lg text-muted-foreground">
            Comprehensive UI component library for DeSo social media applications
          </p>
          <Badge variant="secondary" className="text-sm">
            Phase 1 Complete ✅
          </Badge>
        </div>

        {/* Phase 1 Status */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Phase 1: Foundation Setup
            </CardTitle>
            <CardDescription>
              Core infrastructure and development environment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {phase1Tasks.map((task, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm">{task.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Technical Stack */}
        <Card>
          <CardHeader>
            <CardTitle>Technical Stack</CardTitle>
            <CardDescription>
              Modern, production-ready technologies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">Frontend</div>
                <div className="text-sm text-muted-foreground">Next.js 15</div>
                <div className="text-sm text-muted-foreground">React 19</div>
                <div className="text-sm text-muted-foreground">TypeScript</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">Styling</div>
                <div className="text-sm text-muted-foreground">Tailwind CSS</div>
                <div className="text-sm text-muted-foreground">shadcn/ui</div>
                <div className="text-sm text-muted-foreground">Radix UI</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">Data</div>
                <div className="text-sm text-muted-foreground">React Query</div>
                <div className="text-sm text-muted-foreground">Apollo GraphQL</div>
                <div className="text-sm text-muted-foreground">Zod</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="font-semibold">DeSo</div>
                <div className="text-sm text-muted-foreground">deso-protocol</div>
                <div className="text-sm text-muted-foreground">GraphQL API</div>
                <div className="text-sm text-muted-foreground">Identity</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Phases */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Development Phases</CardTitle>
            <CardDescription>
              Systematic component development using Atomic Design
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {upcomingPhases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                    <Icon className="h-5 w-5 text-blue-500" />
                    <div>
                      <div className="font-semibold">{phase.phase}</div>
                      <div className="text-sm text-muted-foreground">{phase.name}</div>
                    </div>
                    <Circle className="h-4 w-4 text-gray-400 ml-auto" />
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card>
          <CardHeader>
            <CardTitle>Ready for Phase 2</CardTitle>
            <CardDescription>
              Start building atomic components with DeSo data integration
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Foundation is complete! Ready to build:
            </p>
            <ul className="text-sm space-y-1 text-muted-foreground">
              <li>• Profile Picture Component</li>
              <li>• Username Display Component</li>
              <li>• Profile Cover Photo Component</li>
              <li>• Feed Item Component</li>
            </ul>
            <Button className="w-full">
              Continue to Phase 2: Atomic Components
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
