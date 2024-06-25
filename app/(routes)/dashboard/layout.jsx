import React from "react";
import SideNav from "./_components/SideNav";
import DashboardTopNav from "./_components/DashboardTopNav";
import { Toaster } from "@/components/ui/toaster";

function layout({ children }) {
  return (
    <div className="h-screen flex">
      <SideNav />
      <div className="flex-1">
        <DashboardTopNav />
        {children}
        <Toaster />
      </div>
    </div>
  );
}

export default layout;
