import React from "react";
import {
  Clock,
  Copy,
  CopyCheck,
  MapPin,
  Pen,
  Settings,
  Trash2,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function EventDetailsCard() {
  return (
    <div className="rounded-md border-t-8 border-blue-300 shadow-md p-4">
      <div className="flex flex-col">
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Settings className="text-muted-foreground" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Pen className="w-4 h-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h2 className="text-lg font-semibold">30 min Meeting</h2>
        <div className="flex justify-between my-4">
          <p className="flex gap-x-1 text-sm items-center text-muted-foreground">
            <Clock /> 30 min
          </p>
          <p className="flex gap-x-1 text-sm items-center text-muted-foreground">
            <MapPin /> Zoom
          </p>
        </div>
        <Separator />
        <div className="flex justify-between mt-4 items-center">
          <p className="flex gap-x-1 text-sm items-center text-blue-600 hover:cursor-pointer">
            <Copy /> Copy link
          </p>
          <Button
            variant="outline"
            className="rounded-full text-blue-600 border-blue-600 hover:text-blue-600/80"
          >
            Share
          </Button>
        </div>
      </div>
    </div>
  );
}

export default EventDetailsCard;
