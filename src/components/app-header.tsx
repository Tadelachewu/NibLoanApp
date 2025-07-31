"use client";

import Link from "next/link";
import {
  Bell,
  LogOut,
  Settings,
  User,
  Languages,
  Check
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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/use-translation";

export function AppHeader() {
    const { t, setLocale, locale } = useTranslation();

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-card px-4 lg:h-[60px] lg:px-6 sticky top-0 z-30">
      <SidebarTrigger className="md:hidden" />
      <div className="w-full flex-1" />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Bell className="h-5 w-5" />
            <span className="sr-only">{t('header.notifications.toggle')}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-80">
          <div className="p-2">
            <h4 className="font-medium text-sm px-2 py-1.5">{t('header.notifications.title')}</h4>
            <div className="mt-2 space-y-2">
              <a href="#" className="flex items-start rounded-md p-2 hover:bg-muted">
                <div className="mt-1 flex h-2.5 w-2.5 translate-x-1 translate-y-1.5 transform">
                  <span className="absolute h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary"></span>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{t('header.notifications.loanApproved.title')}</p>
                  <p className="text-xs text-muted-foreground">{t('header.notifications.loanApproved.description')}</p>
                </div>
              </a>
              <a href="#" className="flex items-start rounded-md p-2 hover:bg-muted">
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium">{t('header.notifications.paymentReminder.title')}</p>
                  <p className="text-xs text-muted-foreground">{t('header.notifications.paymentReminder.description')}</p>
                </div>
              </a>
            </div>
          </div>
        </PopoverContent>
      </Popover>

       <DropdownMenu>
        <DropdownMenuTrigger asChild>
           <Button variant="ghost" size="icon" className="rounded-full">
            <Languages className="h-5 w-5" />
            <span className="sr-only">{t('header.language.toggle')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('header.language.select')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={locale} onValueChange={setLocale}>
            <DropdownMenuRadioItem value="en">{t('header.language.english')}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="am">{t('header.language.amharic')}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://placehold.co/100x100" alt="User Avatar" data-ai-hint="person face" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="sr-only">{t('header.userMenu.toggle')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>{t('header.userMenu.myAccount')}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem><User className="mr-2 h-4 w-4" /> {t('header.userMenu.profile')}</DropdownMenuItem>
          <DropdownMenuItem><Settings className="mr-2 h-4 w-4" /> {t('header.userMenu.settings')}</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login" className="flex items-center w-full"><LogOut className="mr-2 h-4 w-4" /> {t('header.userMenu.logout')}</Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}
