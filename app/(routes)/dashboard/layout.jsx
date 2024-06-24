import React from "react";
import SideNav from "./_components/SideNav";
import DashboardTopNav from "./_components/DashboardTopNav";

function layout({ children }) {
  return (
    <div className="h-screen flex">
      <SideNav />
      <div className="flex-1">
        <DashboardTopNav />
        {children}
      </div>
    </div>
  );
}

export default layout;
