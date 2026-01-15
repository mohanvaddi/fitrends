"use client";

import * as React from "react";
import {
  BookOpen,
  Bot,
  ChevronsUpDown,
  Settings2,
  Dumbbell,
  ChartColumnIncreasing,
  BadgeQuestionMark,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavSub } from "@/components/nav-sub";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from "@/components/ui/sidebar";

const data = {
  // This is sample data.
  user: {
    name: "Bruce Wayne",
    email: "bruce@wayne.corp",
    avatar: "/avatars/shadcn.jpg",
    avatar_fallback: "BW",
  },
  app: {
    name: "Fitrends",
    plan: "Free",
    logo: Dumbbell,
  },
  navMain: [
    {
      title: "Analysis",
      url: "#",
      icon: ChartColumnIncreasing,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "#",
        },
        {
          title: "Workouts",
          url: "#",
        },
        {
          title: "Muscle Groups",
          url: "#",
        },
        {
          title: "Trends",
          url: "#",
        },
      ],
    },
    {
      title: "Articles",
      url: "#",
      icon: BookOpen,
      items: [
        {
          title: "Nutrition",
          url: "#",
        },
        {
          title: "Weight Training",
          url: "#",
        },
        {
          title: "Cardio",
          url: "#",
        },
      ],
    },
    {
      title: "AI",
      url: "#",
      icon: Bot,
      items: [
        {
          title: "Chat",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "FAQ",
      url: "#",
      icon: BadgeQuestionMark,
    },
    {
      name: "Settings",
      url: "#",
      icon: Settings2,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <data.app.logo className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{data.app.name}</span>
            <span className="truncate text-xs">{data.app.plan}</span>
          </div>
          <ChevronsUpDown className="ml-auto" />
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSub projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
