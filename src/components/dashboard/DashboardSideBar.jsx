"use client";

import React from "react";
import Link from "next/link";
import { Button, Drawer } from "@heroui/react";
import {
  Home,
  Search,
  Bell,
  MessageSquare,
  User,
  Settings,
  Menu,
  Briefcase,
} from "lucide-react";

const DashboardSideBar = () => {
  const navItems = [
    {
      icon: Home,
      href: "/dashboard/recruiter",
      label: "Home",
    },
    {
      icon: Search,
      href: "/dashboard/recruiter/job",
      label: "Jobs",
    },
    {
      icon: Bell,
      href: "/dashboard/recruiter/job/new",
      label: "Post  a Job",
    },
    {
      icon: Briefcase,
      href: "/dashboard/recruiter/company",
      label: "Company Profile",
    },
    {
      icon: MessageSquare,
      href: "/messages",
      label: "Messages",
    },
    {
      icon: User,
      href: "/profile",
      label: "Profile",
    },
    {
      icon: Settings,
      href: "/settings",
      label: "Settings",
    },
  ];

  const navContent = (
    <nav className="flex flex-col gap-1">
      {navItems.map((item) => {
        const Icon = item.icon;

        return (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
          >
            <Icon className="size-5 text-muted-foreground" />
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden w-64 shrink-0 border-r border-default p-4 lg:block">
        {navContent}
      </aside>

      {/* Mobile */}
      <Drawer>
        <Button className="lg:hidden" variant="secondary">
          <Menu size={18} />
          Sidebar
        </Button>

        <Drawer.Backdrop>
          <Drawer.Content placement="left">
            <Drawer.Dialog>
              <Drawer.CloseTrigger />

              <Drawer.Header>
                <Drawer.Heading>Navigation</Drawer.Heading>
              </Drawer.Header>

              <Drawer.Body>{navContent}</Drawer.Body>
            </Drawer.Dialog>
          </Drawer.Content>
        </Drawer.Backdrop>
      </Drawer>
    </>
  );
};

export default DashboardSideBar;