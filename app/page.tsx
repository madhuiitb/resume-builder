import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen">
        {/* Header */}
<header className="border-b">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="text-xl font-semibold">
            ResumeAI
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost">Sign In</Button>
            <Button>Get Started</Button>
          </div>
        </div>
      </header>

       {/* Hero */}
      <section className="mx-auto flex max-w-7xl flex-col items-center px-6 py-24 text-center">
        <div className="mb-4">
          <span className="rounded-full border px-3 py-1 text-sm">
            AI-Powered Resume Platform
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
          Build better resumes.
          <br />
          Optimize them with AI.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
          Analyze your resume against job descriptions, identify missing
          skills and keywords, and improve your resume with AI-powered
          suggestions.
        </p>

        <div className="mt-8 flex gap-4">
          <Button size="lg">
            Check Your Resume
          </Button>

          <Button size="lg" variant="outline">
            Build a Resume
          </Button>
        </div>
      </section>


      {/* Features */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-24 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>ATS Analysis</CardTitle>
          </CardHeader>

          <CardContent>
            Analyze your resume against a specific job description and
            understand where it can be improved.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>AI Resume Builder</CardTitle>
          </CardHeader>

          <CardContent>
            Create and edit your resume with AI-assisted suggestions for
            experience, skills, and summaries.
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Actionable Insights</CardTitle>
          </CardHeader>

          <CardContent>
            Discover missing keywords, skills, and improvements instead of
            relying only on an overall ATS score.
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
