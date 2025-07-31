"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CreditCard,
  FileText,
  Home,
  Landmark,
  LifeBuoy,
  Shield,
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
  SidebarSeparator,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { useTranslation } from "@/hooks/use-translation";

export default function DashboardLayout({ children }: { children: React.ReactNode; }) {
  const { t } = useTranslation();
  // In a real app, you would get this from your auth context
  const userRole = "customer"; 

  const navItems = [
    { href: "/dashboard", icon: Home, label: t('dashboard.nav.dashboard'), roles: ['customer', 'loan-officer', 'admin'] },
    { href: "/dashboard/apply", icon: FileText, label: t('dashboard.nav.apply'), roles: ['customer'] },
    { href: "/dashboard/repayment", icon: CreditCard, label: t('dashboard.nav.repayments'), roles: ['customer'] },
    { href: "/dashboard/support", icon: LifeBuoy, label: t('dashboard.nav.support'), roles: ['customer', 'loan-officer', 'admin'] },
  ];
  
  const adminNavItems = [
    { href: "/dashboard/admin/users", icon: Shield, label: t('dashboard.nav.userManagement'), roles: ['admin'] },
  ];

  function NavItem({ href, icon: Icon, children }: { href: string; icon: React.ElementType; children: React.ReactNode }) {
      const pathname = usePathname();
      const isActive = pathname.startsWith(href);

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
