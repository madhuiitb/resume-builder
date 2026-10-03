"use client";

import { Bell } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MobileNav } from "./mobile-nav";

export function AppHeader() {
  return (
<header className="flex h-16 items-center justify-between border-b px-4 md:px-6">
  <div className="flex items-center gap-2">
    <div className="md:hidden">
      <MobileNav />
    </div>

    <h1 className="text-lg font-semibold">Dashboard</h1>
  </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <DropdownMenu>
                   <DropdownMenuTrigger
            render={<Button variant="ghost" className="gap-2" />}
          >
            <Avatar className="h-8 w-8">
              <AvatarFallback>MK</AvatarFallback>
            </Avatar>

            <span className="hidden md:inline">User</span>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem>Sign out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}