"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import LocationOptions from "@/app/_utils/LocationOptions";
import Image from "next/image";
import ThemeOptions from "@/app/_utils/ThemeOptions";

function MeetingForm() {
  const [eventName, setEventName] = useState("");
  const [duration, setDuration] = useState(30);
  const [locationType, setLocationType] = useState("");
  const [themeColor, setThemeColor] = useState("");

  useEffect(() => {
    console.log("Event: ", eventName);
    console.log("Duration: ", duration);
    console.log("LocationType: ", locationType);
    console.log("Theme Color: ", themeColor);
  }, [eventName, duration, locationType, themeColor]);

  /* Logic for this method

  -- Created

   */

  return (
    <div className="h-screen w-1/3 border-r p-6">
      <div>
        <Link
          href="/dashboard"
          className="flex hover:cursor-pointer hover:text-primary/60"
        >
          <ChevronLeft />
          Cancel
        </Link>
        <h1 className="text-2xl my-4 font-bold">Create a New Event</h1>
        <Separator />
        <div className="my-4 flex gap-y-2 flex-col">
          <label>Event Name *</label>
          <Input
            placeholder="Weekly 1/1 with Josh"
            className="w-full"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
        </div>
        <div className="my-4 flex gap-y-2 flex-col">
          <DropdownMenu>
            <label>Duration *</label>
            <DropdownMenuTrigger asChild className="w-1/3">
              <Button
                variant="outline"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              >
                {duration} min
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setDuration(15)}>
                15 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(30)}>
                30 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(45)}>
                45 min
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDuration(60)}>
                60 min
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="my-4 flex gap-y-2 flex-col">
          <label>Location *</label>
          <div className="lg:flex lg:justify-between lg:gap-x-1 block md:grid md:grid-cols-2 md:gap-2 ">
            {LocationOptions.map((option, index) => (
              <div
                className="flex flex-col justify-center border rounded-md py-2 px-4 md:items-center lg:w-1/4 hover:bg-slate-100 hover:cursor-pointer hover:transition-all hover:duration-100"
                key={index}
                onClick={() => setLocationType(option.name)}
              >
                <Image
                  src={option.icon}
                  width={40}
                  height={40}
                  alt={option.name}
                />
                <p>{option.name}</p>
              </div>
            ))}
          </div>
        </div>
        {locationType && (
          <div className="my-4 flex gap-y-2 flex-col">
            <label> {locationType} link</label>
            <Input placeholder="Add link here" className="w-full" />
          </div>
        )}
        <div className="my-4 flex gap-y-2 flex-col">
          <label>Select Theme Color *</label>
          <div className="flex justify-evenly">
            {ThemeOptions.map((color, index) => (
              <div
                key={index}
                className={`w-8 h-8 rounded-full cursor-pointer ${
                  themeColor === color && "border-2 border-slate-800"
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setThemeColor(color)}
              />
            ))}
          </div>
        </div>
        <div className="my-8">
          {/* Logic that disables the button unless below fields are filled */}
          <Button
            disabled={[eventName, locationType, themeColor].some(
              (value) => !value
            )}
            className="w-full"
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

export default MeetingForm;
