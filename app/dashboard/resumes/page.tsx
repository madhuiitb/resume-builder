import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ResumesPage() {
  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">
            Resumes
          </h1>

          <p className="text-sm text-muted-foreground">
            Create and manage your resumes.
          </p>
        </div>

        <Button>
          <Link href="/dashboard/resumes/new">
            Create Resume
          </Link>
        </Button>
      </div>

      <Card className="border-border/60">
        <CardHeader>
          <CardTitle>My Resumes</CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            You don&apos;t have any resumes yet.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}