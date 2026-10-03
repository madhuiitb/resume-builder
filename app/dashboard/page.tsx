import { ArrowRight, FileText, ScanSearch, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const stats = [
  {
    title: "Resumes",
    value: "3",
    description: "Total resumes",
  },
  {
    title: "ATS Checks",
    value: "8",
    description: "Analyses completed",
  },
  {
    title: "Average Score",
    value: "82%",
    description: "Across your resumes",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8 p-4 md:p-6">
      {/* Welcome */}
      <section>
        <h2 className="text-2xl font-bold tracking-tight">
          Welcome back
        </h2>

        <p className="mt-1 text-muted-foreground">
          Build, analyze, and improve your resume with AI.
        </p>
      </section>

      {/* Stats */}
      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
            </CardHeader>

            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>

              <p className="mt-1 text-sm text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Quick Actions */}
      <section>
        <h3 className="mb-4 text-lg font-semibold">
          Quick Actions
        </h3>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <FileText className="h-8 w-8" />

                <div>
                  <h4 className="font-medium">Create Resume</h4>
                  <p className="text-sm text-muted-foreground">
                    Build a new resume
                  </p>
                </div>
              </div>

              <Button size="icon" variant="ghost">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <ScanSearch className="h-8 w-8" />

                <div>
                  <h4 className="font-medium">Check ATS</h4>
                  <p className="text-sm text-muted-foreground">
                    Analyze your resume
                  </p>
                </div>
              </div>

              <Button size="icon" variant="ghost">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Sparkles className="h-8 w-8" />

                <div>
                  <h4 className="font-medium">Improve with AI</h4>
                  <p className="text-sm text-muted-foreground">
                    Enhance your resume
                  </p>
                </div>
              </div>

              <Button size="icon" variant="ghost">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}