import Link from "next/link";
import {
  FileText,
  LayoutDashboard,
  Briefcase,
  Settings,
  ScanSearch,
} from "lucide-react";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Resumes",
    href: "/dashboard/resumes",
    icon: FileText,
  },
  {
    name: "ATS Checker",
    href: "/dashboard/ats-checker",
    icon: ScanSearch,
  },
  {
    name: "Jobs",
    href: "/dashboard/jobs",
    icon: Briefcase,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 border-r bg-background md:flex md:flex-col">
      <div className="flex h-16 items-center border-b px-6">
        <Link href="/dashboard" className="text-xl font-semibold">
          ResumeAI
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Icon className="h-4 w-4" />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}