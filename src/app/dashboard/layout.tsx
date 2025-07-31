"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CreditCard,
  FileText,
  Home,
  Landmark,
  LifeBuoy,
  Shield,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";

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
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/use-translation";
import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [userRole, setUserRole] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const role = localStorage.getItem("userRole");
    if (role) {
      setUserRole(role);
    } else {
      router.replace("/login");
    }
    setIsLoading(false);
  }, [router]);

  const navItems = [
    { href: "/dashboard", icon: Home, label: t('dashboard.nav.dashboard'), roles: ['customer', 'loan-officer', 'admin'] },
    { href: "/dashboard/apply", icon: FileText, label: t('dashboard.nav.apply'), roles: ['customer'] },
    { href: "/dashboard/repayment", icon: CreditCard, label: t('dashboard.nav.repayments'), roles: ['customer'] },
    { href: "/dashboard/loans", icon: Landmark, label: 'Loan Management', roles: ['loan-officer'] },
    { href: "/dashboard/support", icon: LifeBuoy, label: t('dashboard.nav.support'), roles: ['customer', 'loan-officer', 'admin'] },
  ];
  
  const adminNavItems = [
    { href: "/dashboard/admin/users", icon: Users, label: t('dashboard.nav.userManagement'), roles: ['admin'] },
    { href: "/dashboard/admin/settings", icon: Shield, label: 'System Settings', roles: ['admin'] },
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

  if (isLoading || !userRole) {
    return (
        <div className="flex h-screen w-full items-center justify-center bg-background">
          <div className="flex flex-col items-center gap-4">
            <Skeleton className="h-24 w-24 rounded-full" />
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-6 w-64" />
          </div>
        </div>
    );
  }

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
              {navItems.filter(item => item.roles.includes(userRole)).map((item) => (
                <NavItem key={item.href} href={item.href} icon={item.icon}>{item.label}</NavItem>
              ))}
            </SidebarMenu>

            {userRole === 'admin' && (
                <>
                <SidebarSeparator />
                <SidebarGroup>
                    <SidebarGroupLabel>{t('dashboard.nav.admin.title')}</SidebarGroupLabel>
                    <SidebarMenu>
                        {adminNavItems.map((item) => (
                            <NavItem key={item.href} href={item.href} icon={item.icon}>{item.label}</NavItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
                </>
            )}

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
