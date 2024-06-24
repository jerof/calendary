import React from "react";
import SideNav from "./_components/SideNav";

function layout({ children }) {
  return (
    <div className="h-screen flex">
      <SideNav />
      <div className="flex-1">{children}</div>
    </div>
  );
}

export default layout;
