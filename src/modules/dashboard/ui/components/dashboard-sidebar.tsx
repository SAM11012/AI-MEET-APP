"use client";
import React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { BotIcon, StarIcon, VideoIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import DashUserButton from "./dashboard-user-button";

// Menu items.
const firstSection = [
  {
    title: "Meetings",
    url: "/meetings",
    icon: VideoIcon,
  },
  {
    title: "Agents",
    url: "/agents",
    icon: BotIcon,
  },
];
const secondSection = [
  {
    title: "Upgrade",
    url: "/upgrade",
    icon: StarIcon,
  },
];
const DashboardSideBar = () => {
  const pathname = usePathname();
  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href="/" className="flex items-center gap-2 px-2 pt-2 ">
          <Image
            src="/logo.svg"
            width={36}
            height={36}
            alt="meetify logo"
            className="h-12 w-2xl"
          />
        </Link>
      </SidebarHeader>
      <div className="px-4 py-3">
        <Separator className="opacity-10 text-[#5d6b68]" />
      </div>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {firstSection.map((item,index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent-5% from-5% via-30% via-sidebar/50 to border/50",
                      pathname === item.url &&
                        "bg-linear-to-r/oklch border-[#5d6b68]/10"
                    )}
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <div className="px-4 py-3">
          <Separator className="opacity-10 text-[#5d6b68]" />
        </div>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {secondSection.map((item,index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton
                    className={cn(
                      "h-10 hover:bg-linear-to-r/oklch border border-transparent hover:border-[#5d6b68]/10 from-sidebar-accent-5% from-5% via-30% via-sidebar/50 to border/50",
                      pathname === item.url &&
                        "bg-linear-to-r/oklch border-[#5d6b68]/10"
                    )}
                    asChild
                    isActive={pathname === item.url}
                  >
                    <Link href={item.url}>
                      <item.icon className="size-5" />
                      <span className="text-sm font-medium tracking-tight">
                        {item.title}
                      </span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="text-white">
        <DashUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};

export default DashboardSideBar;
