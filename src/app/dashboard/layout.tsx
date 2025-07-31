"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  FileText,
  Home,
  Landmark,
  LifeBuoy,
} from "lucide-react";

import { AppHeader } from "@/components/app-header";
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInset,
} from "@/components/ui/sidebar";

const navItems = [
    { href: "/dashboard", icon: Home, label: "Dashboard" },
    { href: "/dashboard/apply", icon: FileText, label: "Apply for Loan" },
    { href: "/dashboard/repayment", icon: CreditCard, label: "Repayments" },
    { href: "/dashboard/support", icon: LifeBuoy, label: "Support" },
];

function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
    const pathname = usePathname();
    const isActive = pathname === href;

    return (
        <SidebarMenuItem>
            <Link href={href} legacyBehavior passHref>
                <SidebarMenuButton isActive={isActive} tooltip={{ children }}>
                    <Icon />
                    <span>{children}</span>
                </SidebarMenuButton>
            </Link>
        </SidebarMenuItem>
    );
}

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  return (
    <SidebarProvider>
        <Sidebar side="left" collapsible="icon">
          <SidebarHeader className="p-4 justify-center">
            <Link href="/dashboard" className="flex items-center gap-2.5 font-semibold">
              <Landmark className="h-7 w-7 text-primary" />
              <span className="font-headline text-xl group-data-[collapsible=icon]:hidden">X Bank</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <NavItem key={item.href} href={item.href} icon={item.icon}>{item.label}</NavItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <SidebarInset>
          <AppHeader />
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background">
            {children}
          </main>
        </SidebarInset>
    </SidebarProvider>
  );
}
