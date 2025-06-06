"use client";
import { Button } from "@/components/ui/button";
import { SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import {
  PanelLeftCloseIcon,
  PanelLeftIcon,
  Search,
  SearchIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import DashbaoardSearch from "./DashbaoardSearch";

const DashboardNavbar = () => {
  const SidebarState = useSidebar();
  const [opencommand, setOpencommand] = useState<boolean>(false);
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpencommand((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);
  console.log(SidebarState, "the sidebar state");
  return (
    <>
      <DashbaoardSearch open={opencommand} setOpen={setOpencommand} />{" "}
      <nav className="flex px-4 gap-x-2 items-center py-3 border-b bg-background">
        <Button
          className="size-9 "
          variant="outline"
          onClick={SidebarState.toggleSidebar}
        >
          {SidebarState.state === "expanded" || !SidebarState.isMobile ? (
            <PanelLeftIcon />
          ) : (
            <PanelLeftCloseIcon />
          )}
        </Button>
        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={()=>setOpencommand((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            <span className="text-xs">&#8984;</span>K
          </kbd>
        </Button>
      </nav>
    </>
  );
};

export default DashboardNavbar;
