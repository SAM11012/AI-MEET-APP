import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import DashboardSideBar from "@/modules/dashboard/ui/components/dashboard-sidebar";
import DashboardNavbar from "@/modules/dashboard/ui/components/DashboardNavbar";
import React, { ReactNode } from "react";
interface layoutProps {
  children: ReactNode;
}
const Layout = (props: layoutProps) => {
  return (
    <SidebarProvider>
      <DashboardSideBar />
      <main className="flex flex-col h-screen w-screen  bg-muted">
      <DashboardNavbar/>
        {props.children}
      </main>
    </SidebarProvider>
  );
};

export default Layout;
