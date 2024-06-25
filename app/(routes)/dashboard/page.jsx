import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

import EventDetailsCard from "./_components/EventDetailsCard";

function Dashboard() {
  return (
    <div className="grid grid-cols-3 gap-2 p-4">
      <EventDetailsCard />
    </div>
  );
}

export default Dashboard;
