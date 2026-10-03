"use client";

import Link from "next/link";
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Menu,
  ScanSearch,
  Settings,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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

export function MobileNav() {
  return (
    <Sheet>
            <SheetTrigger
        render={
          <Button variant="ghost" size="icon" aria-label="Open navigation" />
        }
      >
        <Menu className="h-5 w-5" />
      </SheetTrigger>

      <SheetContent side="left" className="w-64">
        <SheetHeader>
          <SheetTitle>ResumeAI</SheetTitle>
        </SheetHeader>

        <nav className="mt-6 space-y-1">
          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-muted"
              >
                <Icon className="h-4 w-4" />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
  );
}