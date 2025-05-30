"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';

interface NavItem {
  href: string;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/sop', label: 'SOP Management', icon: FileText },
];

export function SidebarNav() {
  const pathname = usePathname();

  return (
    <SidebarMenu>
      {navItems.map((item) => (
        <SidebarMenuItem key={item.href}>
          <Link href={item.href} passHref legacyBehavior>
            <SidebarMenuButton
              asChild
              variant="default"
              size="default"
              isActive={pathname === item.href}
              tooltip={{ children: item.label, side: 'right', align: 'center' }}
              className={cn(
                'w-full justify-start',
                pathname === item.href
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground font-semibold'
                  : 'hover:bg-sidebar-accent/80'
              )}
            >
              <a className="flex items-center w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-md transition-colors">
                <item.icon className="h-5 w-5 mr-3 shrink-0" />
                <span className="truncate">{item.label}</span>
              </a>
            </SidebarMenuButton>
          </Link>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
