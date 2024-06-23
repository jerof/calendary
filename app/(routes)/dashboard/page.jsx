import React from "react";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";

function Dashboard() {
  return (
    <div>
      Dashboard <LogoutLink>Logout</LogoutLink>
    </div>
  );
}

export default Dashboard;
