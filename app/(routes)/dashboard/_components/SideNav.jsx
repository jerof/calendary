"use client";

import { Button } from "@/components/ui/button";
import { Briefcase, Calendar, Clock, Plus, Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

function SideNav({ params }) {
  const menu = [
    {
      id: 1,
      name: "Event Type",
      path: "/dashboard/event-type",
      icon: Briefcase,
    },
    {
      id: 2,
      name: "Availability",
      path: "/dashboard/availability",
      icon: Clock,
    },
    {
      id: 3,
      name: "Scheduled Events",
      path: "/dashboard/scheduled-events",
      icon: Calendar,
    },
    {
      id: 4,
      name: "Settings",
      path: "/dashboard/settings",
      icon: Settings,
    },
  ];
  const pathname = usePathname();

  return (
    <div className="flex w-64 bg-slate-50 items-center flex-col p-4">
      <Image
        src="/logo.svg"
        height={60}
        width={60}
        alt="logo"
        className="my-8"
      />
      <div className="w-full my-4">
        <Button className="w-full flex items-center justify-center px-4 py-2 rounded-full gap-x-2 hover:scale-105 transition-all duration-200">
          <Plus />
          <Link href={"/create-event"}>Create</Link>
        </Button>
      </div>
      <div className="flex flex-col gap-y-2 w-full mt-8">
        {menu.map((item, index) => (
          <Link href={item.path} key={index}>
            <Button
              variant="ghost"
              className={`flex items-center w-full gap-x-3 justify-start px-4 py-6 hover:bg-slate-200 hover:scale-105 transition-all duration-200 ${
                pathname === item.path &&
                "bg-slate-800 text-white hover:bg-slate-900 hover:text-white"
              }`}
            >
              <item.icon /> {item.name}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SideNav;
