"use client";
import React from "react";
import {
  LogoutLink,
  useKindeBrowserClient,
} from "@kinde-oss/kinde-auth-nextjs";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ChevronDown,
  DoorClosed,
  DoorOpen,
  LogOut,
  LogOutIcon,
  Settings,
  User,
} from "lucide-react";

function DashboardTopNav() {
  const { user } = useKindeBrowserClient();
  return (
    <div className="flex items-center justify-end p-4 px-8">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="flex items-center rounded-lg border p-2 px-3 w-24 justify-between">
            {user && user.picture && (
              <Image
                src={user.picture}
                alt="User Photo"
                className="w-10 h-10 rounded-full"
                height={40}
                width={40}
              />
            )}
            <ChevronDown />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <User className="w-4 h-4 mr-2 cursor-pointer" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Settings className="w-4 h-4 mr-2 cursor-pointer" />
            Settings
          </DropdownMenuItem>
          <DropdownMenuItem>
            <LogOutIcon className="w-4 h-4 mr-2 cursor-pointer" />
            <LogoutLink>Logout</LogoutLink>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DashboardTopNav;
