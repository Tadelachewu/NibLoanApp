"use client";

import Link from "next/link";
import {
  Bell,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1" />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <div className="p-2">
            <h4 className="font-medium text-sm px-2 py-1.5">Notifications</h4>
            <div className="mt-2 space-y-2">
              <a href="#" className="flex items-start rounded-md p-2 hover:bg-muted">
                <div className="mt-1 flex h-2.5 w-2.5 translate-x-1 translate-y-1.5 transform">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">Loan Approved!</p>
                  <p className="text-xs text-muted-foreground">Your personal loan of $10,000 has been approved.</p>
                </div>
              </a>
              <a href="#" className="flex items-start rounded-md p-2 hover:bg-muted">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">Payment Reminder</p>
                  <p className="text-xs text-muted-foreground">Your next payment of $250 is due in 3 days.</p>
                </div>
              </a>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" data-ai-hint="person face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">Toggle user menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><User className="mr-2 h-4 w-4" /> Profile</DropdownMenuItem>
          <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login" className="flex items-center w-full"><LogOut className="mr-2 h-4 w-4" /> Logout</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
